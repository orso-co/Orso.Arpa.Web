import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RouteTitleService } from '../../services/route-title.service';
import { LanguageService } from '../../services/language.service';
import { MenuItemArpa, MenuService } from '../../components/menu/menu.service';

@Injectable({
  providedIn: 'root',
})
export class TopbarService {

  public title: Subject<string>;

  constructor(
    private menuService: MenuService,
    private languageService: LanguageService,
    private titleService: RouteTitleService) {
    this.menuService.add('user', this.initialiseUserMenu());

    this.menuService.add('feature', [
      {
        label: 'MY_APPOINTMENTS',
        routerLink: '/arpa/profile/appointments',
        icon: 'pi pi-check-square',
        roles: ['performer', 'staff'],
      },
    ]);

    this.title = this.titleService.titleEvent;
  }

  /**
   * Set current locale.
   *
   * @param language
   */
  updateLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

  /**
   * Create custom profile menu.
   *
   * @private
   */
  private initialiseUserMenu(): Array<MenuItemArpa> {
    const userProfileItems: Array<MenuItemArpa> = [
      { label: 'auth.LOGOUT', icon: 'pi pi-sign-out', routerLink: ['/logout'] },
      { label: 'MY_PROFILE', icon: 'pi pi-user-edit', routerLink: ['/arpa/profile'] },
      { separator: true },
    ];
    this.languageService.getLangs().forEach(lang =>
      userProfileItems.push({
        label: this.languageService.getLanguageName(lang),
        command: () => this.updateLanguage(lang),
      }));

    return userProfileItems;
  }
}
