import { BadgeModule } from 'primeng/badge';
import { SelectValueModule } from '../../../../@arpa/pipes/select-value/select-value.module';
import { SelectDialogModule } from '../../profile/select-dialog/select-dialog.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from '../../../../@arpa/components/table/table.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FormFieldModule } from '../../../../@arpa/components/form-field/form-field.module';
import { ButtonModule } from 'primeng/button';
import { PersonDialogEntryComponent } from './person-dialog-entry/person-dialog-entry.component';
import { PersonLayoutComponent } from './person-layout/person-layout.component';
import { PersonDialogRoutingModule } from './person-dialog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../../../../@arpa/translate';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../@arpa/services/language.service';
import { PersonBasedataComponent } from './person-basedata/person-basedata.component';
import { PersonContactdataComponent } from './person-contactdata/person-contactdata.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { MenuModule } from 'src/@arpa/components/menu/menu.module';
import { PersonBankdataComponent } from './person-bankdata/person-bankdata.component';
import { PersonProfilesComponent } from './person-profiles/person-profiles.component';
import { PersonProfilesMusicianComponent } from './person-profiles/person-profiles-musician/person-profiles-musician.component';
import { PersonProfilesMemberComponent } from './person-profiles/person-profiles-member/person-profiles-member.component';
import { PersonProfilesClientComponent } from './person-profiles/person-profiles-client/person-profiles-client.component';

@NgModule({
  declarations: [
    PersonDialogEntryComponent,
    PersonLayoutComponent,
    PersonBasedataComponent,
    PersonContactdataComponent,
    PersonBankdataComponent,
    PersonProfilesComponent,
    PersonProfilesMusicianComponent,
    PersonProfilesMemberComponent,
    PersonProfilesClientComponent
  ],
  imports: [
    CommonModule,
    PersonDialogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDialogModule,

    // Arpa Lib
    TranslateModule.forChild(['person-dialog', 'musician-profile-dialog']),
    MenuModule,
    FormFieldModule,
    TableModule,
    SelectValueModule,

    // NG Prime Dependencies
    ButtonModule,
    DropdownModule,
    BadgeModule,
    InputTextModule,
    TabViewModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    AutoCompleteModule,
    RatingModule,
    SelectButtonModule

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
