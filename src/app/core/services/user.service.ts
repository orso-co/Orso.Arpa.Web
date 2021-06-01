import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IUserDto } from '../../models/IUserDto';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements Resolve<IUserDto[] | IUserDto> {
  baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/users';
  }

  public getUsers(): Observable<IUserDto[]> {
    return this.apiService.get<IUserDto[]>(this.baseUrl);
  }

  public getUser(id: string): Observable<IUserDto> {
    return this.apiService.get<IUserDto>(`${this.baseUrl}/${id}`);
  }

  public deleteUser(username: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${username}`);
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserDto[] | IUserDto> {
    const { id } = route.data;
    return id ? this.getUser(id) : this.getUsers();
  }
}
