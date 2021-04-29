import { Observable, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuthService, IToken } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { Unsubscribe } from '../../core/decorators/unsubscribe.decorator';

@Component({
  selector: 'arpa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
@Unsubscribe()
export class TopbarComponent {

  userProfileItems: MenuItem[] = [];
  token$: Observable<IToken | null>;
  langChangeListener: Subscription;
  sideBarDisplay: boolean;

  constructor(private authService: AuthService,
              private translate: TranslateService,
              private langService: LanguageService) {
    this.token$ = this.authService.currentUser;
    this.initialiseUserMenu();
    // if the language changes retranslate the menu items
    this.langChangeListener = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initialiseUserMenu();
    });
  }

  updateLanguage(language: string): void {
    this.langService.updateLanguage(language);
  }

  getRoleNames(token: IToken): string {
    return token.roles.map((role) => role.charAt(0).toUpperCase() + role.slice(1)).join(', ');
  }

  getInitials(token: IToken): string {
    if (token.displayName) {
      return `${token.displayName
        .split(' ')
        .map((name) => name[0].toUpperCase())
        .join('')}`;
    } else {
      return token.displayName;
    }
  }

  private initialiseUserMenu(): void {
    this.userProfileItems = [
      { label: this.translate.instant('logout.LOG_OUT'), icon: 'pi pi-sign-out', routerLink: ['/logout'] },
      { label: this.translate.instant('PROFILE'), icon: 'pi pi-user-edit', routerLink: ['/arpa/profile'] },
      { separator: true },
    ];
    this.translate.getLangs().forEach(lang =>
      this.userProfileItems.push({
        label: this.langService.getLanguageName(lang),
        command: () => this.updateLanguage(lang),
      }));
  }
}
