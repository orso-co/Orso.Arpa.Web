import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  languageEvent: BehaviorSubject<string>;

  private localeMap = new Map<string, string>([
      ['de', 'Deutsch'],
      ['en', 'English'],
    ],
  );

  constructor(private translate: TranslateService,
              private primengConfig: PrimeNGConfig) {
    this.translate.addLangs(['de', 'en']);
    const lang = localStorage.getItem('locale') || this.getBrowserLang();
    this.languageEvent = new BehaviorSubject(lang);
    this.setLanguage(lang);
    this.translate.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }

  public setLanguage(lang: string): void {
    this.translate.use(lang);
    this.languageEvent.next(lang);
    localStorage.setItem('locale', lang);
  }

  public getLanguageName(code: string): string {
    const name = this.localeMap.get(code);
    return name ? name : code;
  }

  public getLangs() {
    return this.translate.getLangs();
  }

  private getBrowserLang(): string {
    const browserLang = this.translate.getBrowserLang();
    return browserLang.match(/en|de/) ? browserLang : 'de';
  }
}
