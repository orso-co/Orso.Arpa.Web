import { Observable } from 'rxjs';
import { AuthService, IToken } from './../../../services/auth.service';
import { MenuItem } from 'primeng/api';
import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'arpa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  userProfileItems: MenuItem[] = [
    { label: this.translate.instant('logout.LOG_OUT'), icon: 'pi pi-sign-out', routerLink: ['/onboarding/logout'] },
    { label: this.translate.instant('PROFILE'), icon: 'pi pi-user-edit', routerLink: ['/onboarding/profile'] }
  ];
  token$: Observable<IToken | null>;

  constructor(private authService: AuthService,
              private translate: TranslateService) {
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
