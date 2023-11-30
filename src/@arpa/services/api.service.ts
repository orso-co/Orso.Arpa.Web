import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string;

  constructor(private http: HttpClient, private jwtService: JwtService, private configService: ConfigService) {
    const { protocol, baseUrl } = configService.getEnv('api');
    this.baseUrl = `${protocol}://${baseUrl}`;
  }

  get<T>(
    path: string,
    params: HttpParams = new HttpParams(),
    reportProgress: boolean = true,
    observe?: 'body' | undefined,
    responseType?: any
  ): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${path}`, { params, reportProgress, observe, responseType })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(path: string, body: any = {}, reportProgress: boolean = true): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, { reportProgress }).pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: any = {}, params: HttpParams = new HttpParams(), reportProgress: boolean = true): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, { params, reportProgress }).pipe(catchError(this.formatErrors));
  }

  delete<T>(path: string, params: HttpParams = new HttpParams(), reportProgress: boolean = true): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, { params, reportProgress }).pipe(catchError(this.formatErrors));
  }

  postFormData<T>(path: string, body: any = {}, reportProgress: boolean = true): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, { reportProgress }).pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
