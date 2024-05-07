import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { TokenStorageService } from "../services/token-storage.service";

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const storageServ = inject(TokenStorageService);

  console.log(`請求正在被發送或處理中 ... ${req.url}`);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `${storageServ.getToken()}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
  });
  return next(authReq);
};
