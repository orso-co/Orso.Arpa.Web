import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'src/@arpa/translate/';
import { TranslateService } from 'src/@arpa/translate';
import { PersonsRoutingModule} from './persons-routing.module';
import { PersonListComponent } from './person-list/person-list.component';
import { LanguageService } from 'src/@arpa/services/language.service';


@NgModule({
  declarations: [
    PersonListComponent,
  ],
  imports: [
    PersonsRoutingModule,
    CommonModule,
    TranslateModule.forChild(['persons']),
    TableModule,
    DropdownModule,
    ButtonModule,

  ],
  exports: [
    PersonListComponent,
  ],

})
export class PersonsModule {
  constructor(private translateService: TranslateService, private languageService: LanguageService) {
    languageService.languageEvent.subscribe(lang => {
      /**
       * Reset lang for lazy module.
       * Fixes: https://github.com/ngx-translate/core/issues/1193
       */
      translateService.currentLang = '';
      translateService.use(lang);
    });
}}
