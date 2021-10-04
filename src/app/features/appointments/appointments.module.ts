import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentCategoryListResolver } from './resolvers/appointment-category-list.resolver';
import { AppointmentStatusListResolver } from './resolvers/appointment-status-list.resolver';
import { AppointmentParticipationResultListResolver } from './resolvers/appointment-participation-result-list.resolver';
import { AppointmentExpectationListResolver } from './resolvers/appointment-expectation-list.resolver';
import { AppointmentSalaryPatternListResolver } from './resolvers/appointment-salary-pattern-list.resolver';
import { AppointmentSalaryListResolver } from './resolvers/appointment-salary-list.resolver';
import { SectionListResolver } from './resolvers/section-list.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { AppointmentParticipationPredictionListResolver } from './resolvers/appointment-participation-prediction-list.resolver';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../@arpa/services/language.service';
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
  ],
  providers: [
    AppointmentCategoryListResolver,
    AppointmentStatusListResolver,
    AppointmentParticipationPredictionListResolver,
    AppointmentParticipationResultListResolver,
    AppointmentExpectationListResolver,
    AppointmentSalaryPatternListResolver,
    AppointmentSalaryListResolver,
    SectionListResolver,
  ],
})
export class AppointmentsModule {
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
