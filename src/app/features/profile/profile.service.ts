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
        label: 'profile.MY_DATA',
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/user']);
        },
      },
      {
        label: 'profile.MY_MUSICIANPROFILE',
        roles: ['performer'],
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/musician']);
        },
      },

      {
        label: 'profile.MY_PROJECTS',
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/my-projects']);
        },
      },
      {
        label: 'profile.MY_APPOINTMENTS',
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/appointments']);
        },
      },
      {
        label: 'profile.MY_QR_CODE',
        roles: ['performer'],
        command: (event) => {
          this.menuEvents.next(event);
          this.router.navigate(['/arpa/profile/qrcode']);
        },
      },
    ] as Array<MenuItemArpa>);
  }
}
