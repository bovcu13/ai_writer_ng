import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
const LOGIN_TIME_KEY = 'login-time';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // 取得accessToken
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // 刪除並儲存accessToken
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  // 取得refreshToken
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }
    return {};
  }

}
