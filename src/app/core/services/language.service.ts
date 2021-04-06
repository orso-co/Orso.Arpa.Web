import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private languageMap = new Map<string, string>([
      ['de', 'Deutsch'],
      ['en', 'English'],
    ],
  );

  constructor(private translate: TranslateService,
              private primengConfig: PrimeNGConfig) {
    this.initialiseLanguageSettings();
  }

  /**
   * Sets the language to use and saves it in local storage in case page is refreshed
   *
   * @param newLanguage code of new language to use e.g. 'en'
   */
  public updateLanguage(newLanguage: string): void {
    this.translate.use(newLanguage);
    this.translate.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
    localStorage.setItem('language', newLanguage);
  }

  /**
   * Returns the pre-defined name corresponding to the language code
   * If no name has been defined returns the code
   *
   * @param code e.g. 'en', 'de'
   */
  public getLanguageName(code: string): string {
    const name = this.languageMap.get(code);
    return name ? name : code;
  }

  private initialiseLanguageSettings(): void {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    const existingLang = localStorage.getItem('language');
    if (existingLang) {
      this.updateLanguage(existingLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.updateLanguage(browserLang.match(/en|de/) ? browserLang : 'de');
    }
  }
}
