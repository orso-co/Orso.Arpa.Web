import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from 'src/@arpa/translate/';
import { PersonsRoutingModule } from './persons-routing.module';
import { PersonListComponent } from './person-list/person-list.component';
import { LanguageService } from '@arpa/services';
import { ProfilePictureModule, GraphQlFeedModule, TableModule } from '@arpa/components';

@NgModule({
  declarations: [PersonListComponent],
  imports: [
    PersonsRoutingModule,
    CommonModule,
    // Arpa Lib
    TranslateModule.forChild(['persons']),
    GraphQlFeedModule,
    TableModule,
    // NG Prime Dependencies
    DropdownModule,
    ButtonModule,
    ProfilePictureModule,
  ],
  exports: [PersonListComponent],
})
export class PersonsModule {
  constructor(private translateService: TranslateService, private languageService: LanguageService) {
    languageService.languageEvent.subscribe((lang) => {
      /**
       * Reset lang for lazy module.
       * Fixes: https://github.com/ngx-translate/core/issues/1193
       */
      translateService.currentLang = '';
      translateService.use(lang);
    });
  }
}
