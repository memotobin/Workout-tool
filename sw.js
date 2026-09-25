const CACHE_NAME = 'ppl-tracker-v4';
// Paths are relative to this file, so they resolve under /Workout-tool/.
const ASSETS = [
  './',
  'index.html',
  'app.js',
  'app.css',
  'vendor/react.production.min.js',
  'vendor/react-dom.production.min.js',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Serve from cache instantly (works with no signal), refresh the cache in the
// background so updates show up on the next launch.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(e.request, { ignoreSearch: true })
        || (e.request.mode === 'navigate' ? await cache.match('index.html') : undefined);
      const fresh = fetch(e.request)
        .then((res) => { if (res.ok) cache.put(e.request, res.clone()); return res; })
        .catch(() => cached || Response.error());
      if (cached) { e.waitUntil(fresh); return cached; }
      return fresh;
    })
  );
});
