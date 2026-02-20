import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, defer, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip adding internal token to /auth/sync - it needs the Clerk token
  if (req.url.includes('/auth/sync')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getInternalToken();
  const requestWithToken = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(requestWithToken).pipe(
    catchError((error) => {
      const alreadyRetried = requestWithToken.headers.has('X-Auth-Retry');
      const errorDetail = error?.error?.detail;
      const isAuthError =
        error?.status === 401 || (error?.status === 403 && errorDetail === 'Not authenticated');
      const shouldRefresh = isAuthError && !alreadyRetried;

      if (!shouldRefresh) {
        return throwError(() => error);
      }

      authService.clearInternalToken();

      return defer(() => authService.syncUser()).pipe(
        switchMap(() => {
          const refreshedToken = authService.getInternalToken();

          if (!refreshedToken) {
            router.navigate(['/login']);
            return throwError(() => error);
          }

          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${refreshedToken}`,
              'X-Auth-Retry': '1',
            },
          });

          return next(retryRequest);
        }),
        catchError((syncError) => {
          authService.clearInternalToken();
          router.navigate(['/login']);
          return throwError(() => syncError);
        }),
      );
    }),
  );
};