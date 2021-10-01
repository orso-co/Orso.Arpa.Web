import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../../shared/shared.module';
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
import { CommonTranslateModule } from '../../common/translate';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@NgModule({
  declarations: [AppointmentsComponent, EditAppointmentComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    CommonTranslateModule.forChild(['appointments']),
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
