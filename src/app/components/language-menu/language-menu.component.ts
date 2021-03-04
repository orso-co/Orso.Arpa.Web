import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'arpa-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.css']
})
export class LanguageMenuComponent implements OnInit {

  languages: Array<string>;
  currentLanguage: string;

  constructor(private translate: TranslateService) {
    this.languages = translate.getLangs();
    this.currentLanguage = translate.currentLang;
  }

  ngOnInit(): void {
  }

  updateLanguage(langChoice: any): void {
    this.translate.use(langChoice.option);
  }



}
