import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RouteTitleService } from '@arpa/services';
import { LanguageService } from '@arpa/services';
import { MenuItemArpa, MenuService } from '../../components/menu/menu.service';

@Injectable({
  providedIn: 'root',
})
export class TopbarService {
  public title: Subject<string>;

  constructor(private menuService: MenuService, private languageService: LanguageService, private titleService: RouteTitleService) {
    this.menuService.add('user', this.initialiseUserMenu());

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
      { label: 'LOGOUT', icon: 'pi pi-sign-out', routerLink: ['/logout'] },
      { label: 'MY_DATA', icon: 'pi pi-user-layout-edit', routerLink: ['/arpa/profile/user-layout'] },
      { separator: true },
      ...this.languageService.getLangs().map((lang) => ({
        label: this.languageService.getLanguageName(lang),
        command: () => this.updateLanguage(lang),
      })),
      { separator: true },
      { label: 'THEME_SWITCHER', icon: 'pi pi-desktop', command: () => this.menuService.toggleDarkMode() },
    ];
    return userProfileItems;
  }
}
