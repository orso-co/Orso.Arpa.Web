import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '@arpa/services';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SetRoleDto, UserDto, UserStatus } from '@arpa/models';
import { HttpParams } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/users';
  }

  public getUsers(reportProgress: boolean = false, status?: UserStatus): Observable<UserDto[]> {
    let params = undefined;
    if (status) {
      params = new HttpParams().set('userStatus', status.replace(/_/g, '')); // backend does not accept snake case for query paramter
    }

    return this.apiService.get<UserDto[]>(this.baseUrl, params, reportProgress).pipe(shareReplay());
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
