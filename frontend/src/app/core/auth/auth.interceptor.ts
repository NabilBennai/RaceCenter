import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();
  const isAuthRoute =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register') ||
    req.url.includes('/auth/verify-email') ||
    req.url.includes('/auth/refresh');
  const request =
    token && !isAuthRoute
      ? req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        })
      : req;

  return next(request).pipe(
    catchError((error) => {
      if (error.status !== 401 || isAuthRoute || !authService.refreshToken()) {
        return throwError(() => error);
      }
      return authService.refreshAccessToken().pipe(
        switchMap((response) =>
          next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            }),
          ),
        ),
        catchError((refreshError) => {
          authService.logout();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
