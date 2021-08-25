import { SelectItem } from 'primeng/api';
import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../core/services/language.service';
import { Unsubscribe } from '../../core/decorators/unsubscribe.decorator';

@Component({
  selector: 'arpa-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss'],
})
@Unsubscribe()
export class LangSwitchComponent {

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
    this.langService.setLanguage(this.currentLanguage);
  }
}
