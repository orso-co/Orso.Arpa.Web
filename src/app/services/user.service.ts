import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../models/api-url';
import { IUserDto } from '../models/IUserDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/users`;
  }

  public getUsers(): Observable<IUserDto[]> {
    return this.http.get<IUserDto[]>(this.baseUrl);
  }
}
