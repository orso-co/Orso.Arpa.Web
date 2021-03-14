import {Observable, Subscription} from 'rxjs';
import { AuthService, IToken } from './../../../services/auth.service';
import { MenuItem } from 'primeng/api';
import {Component, OnDestroy} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../services/language.service';

@Component({
  selector: 'arpa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy {


  userProfileItems: MenuItem[] = [];
  token$: Observable<IToken | null>;
  langChangeListener: Subscription;
  sideBarDisplay: boolean;

  constructor(private authService: AuthService,
              private translate: TranslateService,
              private langService: LanguageService) {
    this.token$ = this.authService.token$;
    this.initialiseUserMenu();
    // if the language changes retranslate the menu items
    this.langChangeListener = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initialiseUserMenu();
    });
  }

  private initialiseUserMenu(): void {
    this.userProfileItems = [
      { label: this.translate.instant('logout.LOG_OUT'), icon: 'pi pi-sign-out', routerLink: ['/onboarding/login'] },
      { label: this.translate.instant('PROFILE'), icon: 'pi pi-user-edit', routerLink: ['/pages/profile'] },
      { separator: true }
    ];
    this.translate.getLangs().forEach(lang =>
      this.userProfileItems.push({ label: this.langService.getLanguageName(lang),
        command: () => this.updateLanguage(lang) }));
  }

  updateLanguage(language: string): void {
    this.langService.updateLanguage(language);
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
