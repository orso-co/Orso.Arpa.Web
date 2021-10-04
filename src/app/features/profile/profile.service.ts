import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItemArpa, MenuService } from '../../../@arpa/components/menu/menu.service';

@Injectable()
export class ProfileService {

  menuEvents = new Subject<MouseEvent>();

  constructor(private menuService: MenuService, private router: Router) {
    this.menuService.add('profile', [
      {
        label: 'profile.USER_PROFILE',
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/user']);
        },
      },
      {
        label: 'profile.MUSICIAN_PROFILE',
        roles: ['performer'],
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/musician']);
        },
      },
      {
        label: 'profile.MY_APPOINTMENTS',
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/appointments']);
        },
      },
    ] as Array<MenuItemArpa>);
  }
}
