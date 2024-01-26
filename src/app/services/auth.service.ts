import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  isLoggedIn() {
    return window.sessionStorage.getItem('auth-user') !== null;
  }

  getUserRole() {
    return window.sessionStorage.getItem('auth-user');
  }

  logout() {
    window.sessionStorage.clear();
  }

}
