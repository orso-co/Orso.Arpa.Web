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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../../../../@arpa/translate';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@arpa/services';

import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { MenuModule } from 'src/@arpa/components/menu/menu.module';

import { ProfileModule } from '../../profile/profile.module';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { NewsDialogComponent } from './news-dialog.component';
import { NewsRoutingModule } from '../news-routing.module';

@NgModule({
  declarations: [NewsDialogComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
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
    SelectButtonModule,
    ProfileModule,
    ChipModule,
    TagModule,
  ],
})
export class NewsDialogModule {
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
