import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return from(Promise.resolve(authService.getAccessToken())).pipe(
    switchMap(token => {

      const authReq = token
        ? req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          })
        : req;

      return next(authReq).pipe(
        catchError(error => {
          if (error.status === 401) {

            return authService.refreshToken().pipe(
              switchMap(() => {

                const newToken = authService.getAccessToken();
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` },
                });

                return next(retryReq);
              }),
              catchError(refreshError => {
                authService.logout();
                return throwError(() => refreshError);
              })
            );
          }
          if (error.status === 500) {
            router.navigate(['/internal-server-error']);
          }

          if (error.status === 503) {
            router.navigate(['/service-unavailable']);
          }
          return throwError(() => error);
        })
      );
    })
  );
};
