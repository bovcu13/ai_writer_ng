import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  isLoggedIn() {
    return window.sessionStorage.getItem('user') !== null;
  }

  getUserRole() {
    return window.sessionStorage.getItem('user');
  }

  logout() {
    window.sessionStorage.clear();
  }

}
