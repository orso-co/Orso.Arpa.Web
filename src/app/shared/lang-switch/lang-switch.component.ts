import { SelectItem, PrimeNGConfig } from 'primeng/api';
import {Component, OnDestroy} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {LanguageService} from '../../core/services/language.service';

@Component({
  selector: 'arpa-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss']
})
export class LangSwitchComponent implements OnDestroy {

  languages: Array<SelectItem<string>> = [];
  currentLanguage: string;
  langChangeListener: Subscription;

  constructor(private translate: TranslateService, private langService: LanguageService) {
    translate.getLangs().forEach(language => {
      this.languages.push({ value: language });
    });
    this.currentLanguage = translate.currentLang;
    // in case the language is changed somewhere else in the app
    this.langChangeListener = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  updateLanguage(): void {
    this.langService.updateLanguage(this.currentLanguage);
  }

  ngOnDestroy(): void {
    this.langChangeListener.unsubscribe();
  }
}
