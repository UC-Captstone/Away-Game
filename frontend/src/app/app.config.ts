import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClerk } from '@jsrob/ngx-clerk';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

const CLERK_PUBLISHABLE_KEY = environment.clerkPublishableKey;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClerk({
      publishableKey: CLERK_PUBLISHABLE_KEY,
      signInUrl: '/login',
      signUpUrl: '/signup',
      afterSignInUrl: '/',
      afterSignUpUrl: '/',
    }),
  ],
};
