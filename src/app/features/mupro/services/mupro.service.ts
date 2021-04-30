import { Injectable } from '@angular/core';
import { IUserDto } from '../../../models/IUserDto';
import { UserService } from '../../../core/services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class MuproService {

  _user: Observable<IUserDto>;

  get user(): Observable<IUserDto> {
    return this._user;
  }

  set user(user: Observable<IUserDto>) {
    this._user = user;
  }

  constructor(private userService: UserService) {
  }
}
