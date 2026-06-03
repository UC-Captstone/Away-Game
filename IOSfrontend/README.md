# Away Game iOS Frontend

This project wraps the existing Angular frontend in an Ionic + Capacitor shell so it can be packaged as a native iOS app.

## What it reuses

- The existing Angular feature routes, services, guards, and auth flow from `../frontend`
- The current Tailwind styling and Leaflet map setup
- The same API contract exposed by the FastAPI backend
- The same static branding assets copied into `public/` and `src/assets/`

## Local development

```bash
cd IOSfrontend
npm install
npm start
```

That starts the Angular dev server for browser-based testing of the mobile shell.

## iOS build flow

Capacitor iOS support has to be added on macOS with Xcode installed.

```bash
cd IOSfrontend
npm install
npm run build
npm run cap:add:ios
npm run cap:sync
npm run cap:open:ios
```

The generated native project will live under `ios/` after `cap add ios`.

## Notes

- The wrapper currently uses the existing web app's location, auth, storage, and routing behavior.
- If you want more native iOS behavior later, the next candidates are geolocation, map launching, and storage abstraction.
