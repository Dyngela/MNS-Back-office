import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../constant/constant";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  headers = {
    'content-type': 'application/json',
  };

  httpOptions = { headers: this.headers };

  get(path: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${path}`)
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(
        `${environment.apiUrl}${path}`,
        JSON.stringify(body),
        this.httpOptions
      )
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}${path}`,
        JSON.stringify(body),
        this.httpOptions
      )
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}${path}`)
  }
}
