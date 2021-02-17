import { UserService } from './../services/user.service';
import { IUserDto } from './../models/IUserDto';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserListResolver implements Resolve<IUserDto[]> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserDto[]> {
    return this.userService.getUsers();
  }
}
