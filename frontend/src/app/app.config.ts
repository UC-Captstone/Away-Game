import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClerk } from '@jsrob/ngx-clerk';

import { routes } from './app.routes';

// Nathan TODO: set up environment variable for Clerk publishable key when server is ready
const CLERK_PUBLISHABLE_KEY = '';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClerk({
      publishableKey: CLERK_PUBLISHABLE_KEY,
      signInUrl: '/login',
      signUpUrl: '/signup',
      afterSignInUrl: '/',
      afterSignUpUrl: '/',
    }),
  ],
};
