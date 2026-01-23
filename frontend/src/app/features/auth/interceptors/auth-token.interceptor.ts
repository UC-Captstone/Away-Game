import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip adding internal token to /auth/sync - it needs the Clerk token
  if (req.url.includes('/auth/sync')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.getInternalToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};