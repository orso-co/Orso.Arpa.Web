import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IUserDto } from '../../models/IUserDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/users';
  }

  public getUsers(): Observable<IUserDto[]> {
    return this.apiService.get<IUserDto[]>(this.baseUrl);
  }

  public deleteUser(username: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${username}`);
  }
}
