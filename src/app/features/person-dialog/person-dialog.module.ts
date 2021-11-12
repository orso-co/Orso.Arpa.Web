import { PersonDialogEntryComponent } from './person-dialog-entry/person-dialog-entry.component';
import { PersonLayoutComponent } from './person-layout/person-layout.component';
import { PersonDialogRoutingModule } from './person-dialog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { TranslateModule } from '../../../@arpa/translate';
import { SelectValueModule } from '../../../@arpa/pipes/select-value/select-value.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../@arpa/services/language.service';
import { TableModule } from '../../../@arpa/components/table/table.module';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [
    PersonDialogEntryComponent,
    PersonLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersonDialogRoutingModule,

    // Arpa Lib
    TranslateModule.forChild(['person-dialog']),
    SelectValueModule,
    FormFieldModule,
    TableModule,

    // NG Prime Dependencies
    AccordionModule,
    CheckboxModule,
    MultiSelectModule,
    DropdownModule,
    RatingModule,
    PanelModule,
    ButtonModule,
    TooltipModule,
    TabViewModule,
    PrimeTableModule,
    CalendarModule,
    InputTextModule,
    BadgeModule,
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
