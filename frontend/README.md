# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

Notes:
- `npm start` maps to `ng serve` and uses the `local` serve configuration.
- The frontend expects backend API routes at `/api` (local default is `http://localhost:7071/api`).
- Environment files live in `src/environments/`.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## iOS build (Capacitor)

The iOS app is a Capacitor wrapper around the Angular frontend, reusing the same routes, services, and data flows.

### Prerequisites
- Node.js 20+
- Xcode 15+
- iOS 15.0 deployment target
- CocoaPods (`brew install cocoapods`)

### Build + sync

```bash
cd frontend
npm install --legacy-peer-deps
npm run ios:build
```

### Debug vs release
- Debug: open Xcode (`npm run cap:open:ios`) and run on a simulator or device.
- Release: set the Marketing Version + Build in Xcode, then Product → Archive → Distribute App.

### Generate icons + splash

```bash
npx @capacitor/assets generate --icon ./resources/icon.png --splash ./resources/splash.png
npx cap sync ios
```

### Open in Xcode

```bash
npm run cap:open:ios
```

### Environment config
- iOS builds use `src/environments/environment.ios.ts`.
- Update `apiUrl` and `clerkPublishableKey` for the target environment before building.
- Set `production: true` and use a `pk_live_` publishable key for App Store builds.

### Signing + provisioning checklist
- Set the bundle ID to match your Apple Developer account in `ios/App/App.xcodeproj`.
- Select the correct Team and Provisioning Profile in Xcode.
- Ensure `NSLocationWhenInUseUsageDescription` in `ios/App/App/Info.plist` matches your usage text.

### Reproducible build checklist
- `npm run ios:build` (regenerates `dist/frontend/browser`).
- `npx cap sync ios` (copies web assets + plugins).
- `npx @capacitor/assets generate --assetPath ./resources --ios` (refreshes icons/splash).

### QA checklist (mobile)
- Login/signup flows, token refresh, and logout.
- Home featured + nearby events, map rendering, and location permissions.
- Event search filters and event details.
- Game details, add event flow, and safety alerts.
- Community (friends + DMs) and notifications dropdown.
- Profile updates and admin-only access (if enabled).

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm test
```

## Running end-to-end tests

End-to-end tests are not currently configured in this frontend workspace.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
