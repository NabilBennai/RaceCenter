import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from './notification.service';

export const errorToastInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!req.headers.has('X-Skip-Error-Toast')) {
        const message =
          (typeof error.error?.message === 'string' && error.error.message) ||
          (error.status === 0 ? 'Impossible de joindre le serveur' : 'Une erreur est survenue');

        if (error.status >= 500) {
          notifications.error(message, 'Erreur serveur');
        } else if (error.status === 401 || error.status === 403) {
          notifications.warning(message, 'Authentification');
        } else if (error.status >= 400) {
          notifications.error(message, 'Requête invalide');
        } else {
          notifications.error(message);
        }
      }
      return throwError(() => error);
    }),
  );
};
