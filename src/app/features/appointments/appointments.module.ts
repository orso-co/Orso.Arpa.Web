import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentCategoryListResolver } from '../../resolvers/appointment-category-list.resolver';
import { AppointmentStatusListResolver } from '../../resolvers/appointment-status-list.resolver';
import { AppointmentParticipationPredictionListResolver } from '../../resolvers/appointment-participation-prediction-list.resolver';
import { AppointmentParticipationResultListResolver } from '../../resolvers/appointment-participation-result-list.resolver';
import { AppointmentExpectationListResolver } from '../../resolvers/appointment-expectation-list.resolver';
import { AppointmentEmolumentPatternListResolver } from '../../resolvers/appointment-emolument-pattern-list.resolver';
import { AppointmentEmolumentListResolver } from '../../resolvers/appointment-emolument-list.resolver';
import { VenueListResolver } from '../../resolvers/venue-list.resolver';
import { ProjectListResolver } from '../../resolvers/project-list.resolver';
import { SectionListResolver } from '../../resolvers/section-list.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';

@NgModule({
  declarations: [AppointmentsComponent, EditAppointmentComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppointmentCategoryListResolver,
    AppointmentStatusListResolver,
    AppointmentParticipationPredictionListResolver,
    AppointmentParticipationResultListResolver,
    AppointmentExpectationListResolver,
    AppointmentEmolumentPatternListResolver,
    AppointmentEmolumentListResolver,
    VenueListResolver,
    ProjectListResolver,
    SectionListResolver,
  ],
})
export class AppointmentsModule {
}
