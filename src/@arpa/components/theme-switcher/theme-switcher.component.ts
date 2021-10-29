import { Component } from '@angular/core';
import { THEME_NAME, ThemeSwitcherService } from './theme-switcher.service';

@Component({
  selector: 'arpa-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  public darkMode: boolean = true;

  constructor(private themeService: ThemeSwitcherService) {
    this.darkMode = themeService.currentTheme === THEME_NAME.DARK;
  }

  changeTheme({ checked }: any) {
    this.themeService.setTheme(checked ? THEME_NAME.DARK : THEME_NAME.LIGHT);
  }
}
