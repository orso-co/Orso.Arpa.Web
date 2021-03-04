import { Observable } from 'rxjs';
import { AuthService, IToken } from './../../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { Component } from '@angular/core';

@Component({
  selector: 'arpa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  userProfileItems: MenuItem[] = [
    { label: 'Logout', icon: 'pi pi-sign-out', routerLink: ['/onboarding/login'] },
    { label: 'Profile', icon: 'pi pi-user-edit', routerLink: ['/onboarding/profile'] }
  ];
  token$: Observable<IToken | null>;

  constructor(private authService: AuthService) {
    this.token$ = this.authService.token$;
  }

  getRoleNames(token: IToken): string {
    return token.roles.map((role) => role.charAt(0).toUpperCase() + role.slice(1)).join(', ');
  }

  getInitials(token: IToken): string {
    return `${token.displayName
      .split(' ')
      .map((name) => name[0].toUpperCase())
      .join('')}`;
  }
}
