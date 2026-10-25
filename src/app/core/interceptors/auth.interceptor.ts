import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  Observable,
  catchError,
  finalize,
  of,
  shareReplay,
  switchMap,
  throwError,
} from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/login.service';

const AUTH_RETRIED = new HttpContextToken<boolean>(() => false);
let refreshRequest$: Observable<string> | null = null;

function isAuthSkipUrl(url: string): boolean {
  return url.includes('/auth/login') || url.includes('/auth/refresh-token');
}

function refreshAccessToken(
  api: ApiService,
  jwt: JwtService,
  login: LoginService
): Observable<string> {
  if (!refreshRequest$) {
    const refreshToken = jwt.getRefreshToken();
    if (!refreshToken) {
      login.logout();
      return throwError(() => new Error('No refresh token is available.'));
    }

    refreshRequest$ = api
      .post('/auth/refresh-token', { refreshToken })
      .pipe(
        switchMap((response) => {
          const accessToken = response?.data?.accessToken;
          if (!response?.success || typeof accessToken !== 'string') {
            return throwError(
              () => new Error(response?.message || 'Token refresh failed.')
            );
          }
          login.setAuth(response.data);
          return of(accessToken);
        }),
        catchError((error) => {
          login.logout();
          return throwError(() => error);
        }),
        finalize(() => {
          refreshRequest$ = null;
        }),
        shareReplay({ bufferSize: 1, refCount: false })
      );
  }

  return refreshRequest$;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(JwtService);
  const login = inject(LoginService);
  const api = inject(ApiService);

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (!(req.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const token = jwt.getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return next(req.clone({ setHeaders: headers })).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status !== 401 ||
        isAuthSkipUrl(req.url) ||
        req.context.get(AUTH_RETRIED)
      ) {
        return throwError(() => error);
      }

      return refreshAccessToken(api, jwt, login).pipe(
        switchMap((accessToken) =>
          next(
            req.clone({
              context: req.context.set(AUTH_RETRIED, true),
              setHeaders: {
                ...headers,
                Authorization: `Bearer ${accessToken}`,
              },
            })
          )
        )
      );
    })
  );
};
