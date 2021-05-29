import { Injectable } from '@angular/core';
import { MenuItemArpa, MenuService } from '../../shared/menu/menu.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProfileService {

  menuEvents = new Subject<MouseEvent>();

  constructor(private menuService: MenuService, private router: Router) {
    this.menuService.add('profile', [
      {
        label: 'USER_PROFILE',
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/user']);
        },
      },
      {
        label: 'MUSICIAN_PROFILE',
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/musician']);
        },
      },
      {
        label: 'MY_APPOINTMENTS',
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/appointments']);
        },
      },
    ] as Array<MenuItemArpa>);
  }
}
