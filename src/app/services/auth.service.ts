import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const BaseUrl: string = environment.API_URL;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
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

  refreshToken(token: string) {
    const url = `${BaseUrl}/v1.0/refresh`;
    return this.http.post(url, {refresh_token: token}, httpOptions);
  }

}
