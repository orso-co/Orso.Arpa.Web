import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentCategoryListResolver } from './resolvers/appointment-category-list.resolver';
import { AppointmentExpectationListResolver } from './resolvers/appointment-expectation-list.resolver';
import { AppointmentSalaryPatternListResolver } from './resolvers/appointment-salary-pattern-list.resolver';
import { AppointmentSalaryListResolver } from './resolvers/appointment-salary-list.resolver';
import { SectionListResolver } from './resolvers/section-list.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@arpa/services';
import { TranslateModule } from '../../../@arpa/translate';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { StepsModule } from 'primeng/steps';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from '@arpa/components';
import { MessageModule } from 'primeng/message';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [AppointmentsComponent, EditAppointmentComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Arpa Lib
    TranslateModule.forChild(['appointments']),
    // NG Prime Dependencies
    FullCalendarModule,
    ConfirmPopupModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    FieldsetModule,
    CalendarModule,
    CheckboxModule,
    StepsModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    OverlayPanelModule,
    RippleModule,
    TabViewModule,
    ChartModule,
    MessageModule,
    ChipModule,
  ],
  providers: [
    AppointmentCategoryListResolver,
    AppointmentExpectationListResolver,
    AppointmentSalaryPatternListResolver,
    AppointmentSalaryListResolver,
    SectionListResolver,
  ],
})
export class AppointmentsModule {
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
