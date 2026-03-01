import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, defer, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (req.url.includes('/auth/sync')) {
    return next(req);
  }

  const url = router.url ?? '';
  const onAuthRoute = url.startsWith('/login') || url.startsWith('/signup');

  const token = authService.getInternalToken();
  const hadToken = !!token;

  const requestWithToken = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(requestWithToken).pipe(
    catchError((error) => {
      if (onAuthRoute) {
        return throwError(() => error);
      }

      const alreadyRetried = requestWithToken.headers.has('X-Auth-Retry');
      const errorDetail = error?.error?.detail;
      const isAuthError =
        error?.status === 401 || (error?.status === 403 && errorDetail === 'Not authenticated');

      const shouldRefresh = isAuthError && !alreadyRetried && hadToken;

      if (!shouldRefresh) {
        return throwError(() => error);
      }

      authService.clearInternalToken();

      return defer(() => authService.syncUser()).pipe(
        switchMap(() => {
          const refreshedToken = authService.getInternalToken();

          if (!refreshedToken) {
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
          return throwError(() => syncError);
        }),
      );
    }),
  );
};