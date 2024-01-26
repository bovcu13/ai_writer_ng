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
}
