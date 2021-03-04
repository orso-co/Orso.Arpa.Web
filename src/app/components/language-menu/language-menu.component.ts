import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'arpa-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.css']
})
export class LanguageMenuComponent implements OnInit {

  languages: Array<SelectItem<string>> = [];
  currentLanguage: string;

  constructor(private translate: TranslateService) {
    translate.getLangs().forEach(language => {
      this.languages.push({ value: language });
    });
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit(): void {
  }

  updateLanguage(): void {
    this.translate.use(this.currentLanguage);
  }



}
