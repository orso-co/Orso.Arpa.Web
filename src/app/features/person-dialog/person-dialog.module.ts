import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from './../../../@arpa/components/avatar/avatar.module';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FormFieldModule } from './../../../@arpa/components/form-field/form-field.module';
import { ButtonModule } from 'primeng/button';
import { PersonDialogEntryComponent } from './person-dialog-entry/person-dialog-entry.component';
import { PersonLayoutComponent } from './person-layout/person-layout.component';
import { PersonDialogRoutingModule } from './person-dialog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../../../@arpa/translate';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../@arpa/services/language.service';
import { PersonBasedataComponent } from './person-basedata/person-basedata.component';
import { PersonContactdataComponent } from './person-contactdata/person-contactdata.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [PersonDialogEntryComponent, PersonLayoutComponent, PersonBasedataComponent, PersonContactdataComponent],
  imports: [
    CommonModule,
    PersonDialogRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Arpa Lib
    TranslateModule.forChild(['person-dialog']),
    FormFieldModule,

    // NG Prime Dependencies
    TabViewModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule,
    RatingModule,
  ],
})
export class PersonDialogModule {
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
