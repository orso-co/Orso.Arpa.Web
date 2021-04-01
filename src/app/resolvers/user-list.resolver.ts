import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {IUserDto} from '../models/IUserDto';
import {UserService} from '../core/services/user.service';

@Injectable({providedIn: 'root'})
export class UserListResolver implements Resolve<IUserDto[]> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserDto[]> {
    return this.userService.getUsers();
  }
}
