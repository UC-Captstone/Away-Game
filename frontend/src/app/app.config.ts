import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClerk } from '@jsrob/ngx-clerk';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { authTokenInterceptor } from './features/auth/interceptors/auth-token.interceptor';
import { TokenStorageService } from './shared/services/token-storage.service';

const CLERK_PUBLISHABLE_KEY = environment.clerkPublishableKey;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAppInitializer(() => {
      const storage = inject(TokenStorageService);
      return storage.init();
    }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideClerk({
      publishableKey: CLERK_PUBLISHABLE_KEY,
      signInUrl: '/login',
      signUpUrl: '/signup',
      afterSignInUrl: '/',
      afterSignUpUrl: '/',
    }),
  ],
};
