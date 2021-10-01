import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UserDto } from '../../model/userDto';

@Injectable({
  providedIn: 'root',
})
export class UserService implements Resolve<UserDto[] | UserDto> {
  baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/users';
  }

  public getUsers(): Observable<UserDto[]> {
    return this.apiService.get<UserDto[]>(this.baseUrl);
  }

  public getUser(id: string): Observable<UserDto> {
    return this.apiService.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  public deleteUser(username: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${username}`);
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDto[] | UserDto> {
    const { id } = route.data;
    return id ? this.getUser(id) : this.getUsers();
  }
}
