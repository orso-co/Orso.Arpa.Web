import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PrimeNGConfig} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languageMap = new Map<string, string>([
      ['de', 'Deutsch'],
      ['en', 'English']
    ]
  );
  private localStorage: Storage;

  constructor(private translate: TranslateService,
              private primengConfig: PrimeNGConfig) {
    this.localStorage = window.localStorage;
    this.initialiseLanguageSettings();
  }

  private initialiseLanguageSettings(): void {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    const existingLang = this.localStorage.getItem('language');
    console.log(existingLang);
    if (existingLang) {
      this.updateLanguage(existingLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.updateLanguage(browserLang.match(/en|de/) ? browserLang : 'de');
    }
  }

  /**
   * Sets the language to use and saves it in local storage in case page is refreshed
   * @param newLanguage code of new language to use e.g. 'en'
   */
  public updateLanguage(newLanguage: string): void {
    this.translate.use(newLanguage);
    this.translate.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
    this.localStorage.setItem('language', newLanguage);
  }

  /**
   * Returns the pre-defined name corresponding to the language code
   * If no name has been defined returns the code
   * @param code e.g. 'en', 'de'
   */
  public getLanguageName(code: string): string {
    const name = this.languageMap.get(code);
    return name ? name : code;
  }
}
