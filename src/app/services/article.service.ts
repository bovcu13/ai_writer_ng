import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";

const BaseUrl: string = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getAllArticleRequest(page: number = 1, limit: number = 20): Observable<any> {
    const url = `${BaseUrl}/v1.0/articles?page=${page}&limit=${limit}`;
    return this.http.get<any>(url);
  }

  getOneArticleRequest(id: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/articles/${id}`;
    return this.http.get<any>(url);
  }

  postArticleRequest(body: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/articles`;
    return this.http.post<any>(url, body);
  }

  patchArticleRequest(id: any, body: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/articles/${id}`;
    return this.http.patch<any>(url, body);
  }

  deleteArticleRequest(id: any): Observable<any> {
    const url = `${BaseUrl}/v1.0/articles/${id}`;
    return this.http.delete<any>(url);
  }


}
