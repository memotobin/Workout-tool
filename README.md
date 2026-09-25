# PPL Workout Tracker

Push / Pull / Legs workout tracker. Installable Android app (PWA), works fully offline.

Live at: https://memotobin.github.io/Workout-tool/

## Project Structure
```
Workout-tool/
├── index.html          ← Page shell (loads the files below)
├── app.js              ← Built app code (generated — don't edit)
├── app.css             ← Built styles (generated — don't edit)
├── vendor/             ← React + ReactDOM, bundled locally (generated)
├── src/
│   ├── app.jsx         ← App source — edit this
│   └── styles.css      ← Custom styles + Tailwind setup
├── manifest.json       ← PWA manifest (name, icons, colors)
├── sw.js               ← Service worker (offline cache)
└── icon-*.png          ← App icons
```

No external CDNs: everything the app needs is served from this repo and cached
on the phone, so it opens with no signal.

## Storage
Data is stored in **IndexedDB** (with a localStorage backup) on your device.
It persists across restarts and works fully offline. Use **Backup** in the app
to save a JSON recovery file.

## Making Changes
1. Edit `src/app.jsx` (or `src/styles.css`)
2. Build: `npm install` (first time only), then `npm run build`
3. Bump `CACHE_NAME` in `sw.js` (e.g. `ppl-tracker-v4`)
4. Commit and push to `main` — GitHub Pages redeploys in ~1 minute
5. The phone picks up the update on the **second** launch after deploy
   (first launch refreshes the cache in the background)

## Install on Android

**Easiest:** open the live URL in Chrome → ⋮ menu → **Add to Home screen → Install**.

**Full APK (PWABuilder):**
1. https://www.pwabuilder.com → paste the live URL → **Package for stores → Android → Generate**
2. Keep the downloaded zip safe (contains `signing.keystore` + `signing-key-info.txt`)
3. To hide the address bar: create a public repo `memotobin.github.io` containing
   `.well-known/assetlinks.json` (from the zip) and an empty `.nojekyll` file,
   then enable Pages on it (branch `main`, root)
4. Copy the `.apk` from the zip to the phone, open it, allow **Install unknown apps**, install
