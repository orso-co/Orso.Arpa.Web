import {Observable, Subscription} from 'rxjs';
import { AuthService, IToken } from './../../../services/auth.service';
import { MenuItem } from 'primeng/api';
import {Component, OnDestroy} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'arpa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy {

  languageMap = new Map([
      ['de', 'Deutsch'],
      ['en', 'English']
    ]
  );
  userProfileItems: MenuItem[] = [];
  token$: Observable<IToken | null>;
  langChangeListener: Subscription;

  constructor(private authService: AuthService,
              private translate: TranslateService) {
    this.token$ = this.authService.token$;
    this.initialiseUserMenu();
    // in case the language is changed somewhere else in the app
    this.langChangeListener = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initialiseUserMenu();
    });
  }

  private initialiseUserMenu(): void {
    this.userProfileItems = [
      { label: this.translate.instant('logout.LOG_OUT'), icon: 'pi pi-sign-out', routerLink: ['/onboarding/logout'] },
      { label: this.translate.instant('PROFILE'), icon: 'pi pi-user-edit', routerLink: ['/onboarding/profile'] },
      { separator: true }
    ];
    this.translate.getLangs().forEach(lang =>
      this.userProfileItems.push({ label: this.languageMap.has(lang) ? this.languageMap.get(lang) : lang,
        command: () => this.updateLanguage(lang) }));
  }

  updateLanguage(language: string): void {
    this.translate.use(language);
    // translate menu items into the new language
    this.initialiseUserMenu();
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

  ngOnDestroy(): void {
    this.langChangeListener.unsubscribe();
  }
}
