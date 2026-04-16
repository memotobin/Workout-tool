# PPL Workout Tracker — Deploy to Android APK

## Project Structure
```
ppl-tracker-pwa/
├── index.html          ← Full app (single file)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline support)
├── icons/              ← App icons (all sizes)
│   ├── icon-48x48.png
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-144x144.png
│   ├── icon-192x192.png
│   └── icon-512x512.png
└── README.md
```

## Storage
Data is stored in **IndexedDB** on your device. It persists across restarts
and works fully offline. No server needed. Use the CSV export button as a
backup whenever you want.

---

## Step 1 — Push to GitHub

```bash
# Create a new repo on github.com (e.g. "ppl-tracker"), then:
cd ppl-tracker-pwa
git init
git add .
git commit -m "PPL Tracker PWA"
git remote add origin https://github.com/YOUR_USER/ppl-tracker.git
git branch -M main
git push -u origin main
```

## Step 2 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Save — your site will be live at `https://YOUR_USER.github.io/ppl-tracker/`
5. Wait 1-2 minutes, then verify the URL loads the app

## Step 3 — Generate APK with PWABuilder

1. Go to **https://www.pwabuilder.com/**
2. Paste your GitHub Pages URL
3. PWABuilder will analyze your PWA and give it a score
4. Click **"Package for stores"** → select **Android**
5. Choose **"Google Play" (TWA)** option
6. Customize:
   - App name: PPL Tracker
   - Package ID: com.yourname.ppltracker
   - Signing key: let PWABuilder generate one (save it if you plan to update later)
7. Click **Generate** — downloads a .zip with your APK

## Step 4 — Install APK on Your Phone

1. Transfer the `.apk` file to your phone (email it, Google Drive, USB, etc.)
2. On your phone, open the file
3. If prompted, enable **"Install from unknown sources"** for your file manager
4. Tap **Install**
5. Done — PPL Tracker appears in your app drawer with its icon

---

## Alternative: Netlify (if you prefer)

1. Go to **https://app.netlify.com/drop**
2. Drag the entire `ppl-tracker-pwa` folder onto the page
3. It deploys instantly and gives you a URL like `https://random-name.netlify.app`
4. Use that URL in PWABuilder Step 3 above

---

## Updating the App

If you update the code later:
1. Edit `index.html`
2. Bump the `CACHE_NAME` version in `sw.js` (e.g. `ppl-tracker-v2`)
3. Push to GitHub — Pages updates automatically
4. The TWA/APK always loads from your hosted URL, so the app updates itself
