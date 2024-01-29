import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";

const BaseUrl: string = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUserRequest(page: number = 1, limit: number = 20): Observable<any> {
    const url = `${BaseUrl}/v1.0/users?page=${page}&limit=${limit}`;
    return this.http.get<any>(url);
  }

  getOneUserRequest(id: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/users/${id}`;
    return this.http.get<any>(url);
  }

  postUserRequest(body: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/users`;
    return this.http.post<any>(url, body);
  }

  patchUserRequest(id: any, body: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/users/${id}`;
    return this.http.patch<any>(url, body);
  }

  deleteUserRequest(id: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/users/${id}`;
    return this.http.delete<any>(url);
  }


}
