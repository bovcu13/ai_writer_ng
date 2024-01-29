import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, retry, switchMap, take, tap, throwError } from "rxjs";
import { inject } from "@angular/core";
import { TokenStorageService } from "../services/token-storage.service";
import { AuthService } from "../services/auth.service";

export let errorMessage = '';
const TOKEN_HEADER_KEY = 'Authorization';
let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      if ([401].includes(error.status)) {
        console.log('Unauthorized request');
        return handle401Error(req, next) as Observable<HttpEvent<any>>;
      } else if ([403, 500].includes(error.status)) {
        if (error.status === 403) {
          errorMessage = '權限不足';
        } else if (error.status === 500) {
          errorMessage = '伺服器錯誤';
        }
      }
      const e = error.error.message || error.statusText;
      console.log('errorInterceptor:', e);
      return throwError(() => error);
    })
  );
};

const handle401Error = (request: HttpRequest<any>, next: any) => {
  const storageServ = inject(TokenStorageService);
  const authServ = inject(AuthService);

  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);
    const token = storageServ.getRefreshToken();
    if (token)
      if (storageServ.getUser()) {
        return authServ.refreshToken(token).pipe(retry(3), tap(res => {
            // if (res.body.unaccess_count || res.body.unaccess_count === 0) {
            //   authServ.saveUnaccessCount(res.body.unaccess_count);
            // }
          }
        )).pipe(tap(res => {
            console.log(res)
          }),
          switchMap((token: any) => {
            isRefreshing = false;
            storageServ.saveToken(token.body.access_token);
            refreshTokenSubject.next(token.body.access_token);

            return next.handle(addTokenHeader(request, token.body.access_token)).pipe(tap());
          }),
          catchError((err) => {
            isRefreshing = false;
            // blockServ.setStatus(false);
            if (err.status === 401) {
              authServ.logout();
            }
            return throwError(err);
          })
        );
      } else {
        return authServ.refreshToken(token).pipe(retry(3), tap(res => {
            // if (res.body.unaccess_count || res.body.unaccess_count === 0) {
            //   authServ.saveUnaccessCount(res.body.unaccess_count);
            // }
          }
        )).pipe(
          switchMap((token: any) => {
            isRefreshing = false;
            storageServ.saveToken(token.body.access_token);
            refreshTokenSubject.next(token.body.access_token);

            return next.handle(addTokenHeader(request, token.body.access_token)).pipe(tap());
          }),
          catchError((err) => {
            isRefreshing = false;
            // blockServ.setStatus(false);
            if (err.status === 401) {
              authServ.logout();
            }
            return throwError(err);
          })
        );
      }
  }
  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap((token) => next.handle(addTokenHeader(request, token)))
  );
}

const addTokenHeader = (request: HttpRequest<any>, token: string) => {
  return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
}
