import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

const BaseUrl: string = environment.API_URL;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  // 登入
  login(body: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/login`;
    return this.http.post(url, body, httpOptions);
  }

  isLoggedIn() {
    return window.sessionStorage.getItem('auth-user') !== null;
  }

  getUserRole() {
    return window.sessionStorage.getItem('auth-user');
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  register(body: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/users/register`;
    return this.http.post(url, body, httpOptions);
  }

  refreshToken(token: string) {
    const url = `${BaseUrl}/v1.0/refresh`;
    return this.http.post(url, { refresh_token: token }, httpOptions);
  }

}
