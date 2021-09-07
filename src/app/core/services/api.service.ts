import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(
      `${environment.apiUrl}${environment.apiPath}${url}`,
      {
        headers: this.headers,
        params,
      }
    );
  }
  post<T, D>(url: string, data: D): Observable<T> {
    return this.http.post<T>(
      `${environment.apiUrl}${environment.apiPath}${url}`,
      JSON.stringify(data),
      { headers: this.headers }
    );
  }

  put<T, D>(url: string, data: D): Observable<T> {
    return this.http.put<T>(
      `${environment.apiUrl}${environment.apiPath}${url}`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(
      `${environment.apiUrl}${environment.apiPath}${url}`,
      {
        headers: this.headers,
      }
    );
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
