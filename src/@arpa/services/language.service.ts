import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languageEvent: BehaviorSubject<string>;

  readonly localeMap: Record<string, string>;

  constructor(private translate: TranslateService, private ConfigService: ConfigService, private primengConfig: PrimeNGConfig) {
    this.localeMap = ConfigService.getEnv('locale').locales;

    this.translate.addLangs(Object.keys(this.localeMap));

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
    const name = this.localeMap[code];
    return name ? name : code;
  }

  public getLangs() {
    return this.translate.getLangs();
  }

  private getBrowserLang(): string {
    const browserLang = this.translate.getBrowserLang();
    return browserLang!.match(/en|de/) ? browserLang : this.ConfigService.getEnv('locale').default;
  }
}
