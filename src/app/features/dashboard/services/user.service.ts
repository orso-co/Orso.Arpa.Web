import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../../@arpa/services/api.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDto } from '../../../../@arpa/models/userDto';
import { SetRoleDto } from '../../../../@arpa/models/setRoleDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/users';
  }

  public getUsers(reportProgress: boolean = false): Observable<UserDto[]> {
    return this.apiService.get<UserDto[]>(this.baseUrl, undefined, reportProgress);
  }

  public getUser(id: string): Observable<UserDto> {
    return this.apiService.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  public deleteUser(username: string, reportProgress: boolean = false): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${username}`, reportProgress);
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDto[] | UserDto> {
    const { id } = route.data;
    return id ? this.getUser(id) : this.getUsers();
  }

  public setUserRoles(setRole: SetRoleDto): Observable<any> {
    return this.apiService.put(`/auth/role`, setRole, false);
  }
}
