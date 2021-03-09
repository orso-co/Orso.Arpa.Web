import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SelectItem} from 'primeng/api';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'arpa-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.css']
})
export class LanguageMenuComponent implements OnDestroy {

  languages: Array<SelectItem<string>> = [];
  currentLanguage: string;
  langChangeListener: Subscription;

  constructor(private translate: TranslateService, private primengConfig: PrimeNGConfig) {
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
    this.translate.use(this.currentLanguage);
    this.translate.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }

  ngOnDestroy(): void {
    this.langChangeListener.unsubscribe();
  }
}
