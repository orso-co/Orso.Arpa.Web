import { PersonDialogEntryComponent } from './person-dialog-entry/person-dialog-entry.component';
import { PersonLayoutComponent } from './person-layout/person-layout.component';
import { PersonDialogRoutingModule } from './person-dialog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../../../@arpa/translate';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../@arpa/services/language.service';

@NgModule({
  declarations: [
    PersonDialogEntryComponent,
    PersonLayoutComponent,
  ],
  imports: [
    CommonModule,
    PersonDialogRoutingModule,

    // Arpa Lib
    TranslateModule.forChild(['person-dialog']),
  ],
})
export class PersonDialogModule {
  constructor(private translateService: TranslateService, private languageService: LanguageService) {
    languageService.languageEvent.subscribe(lang => {
      /**
       * Reset lang for lazy module.
       * Fixes: https://github.com/ngx-translate/core/issues/1193
       */
      translateService.currentLang = '';
      translateService.use(lang);
    });
  }
}
