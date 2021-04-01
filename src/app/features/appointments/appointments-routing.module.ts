import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentEmolumentListResolver } from '../../resolvers/appointment-emolument-list.resolver';
import { AppointmentEmolumentPatternListResolver } from '../../resolvers/appointment-emolument-pattern-list.resolver';
import { AppointmentExpectationListResolver } from '../../resolvers/appointment-expectation-list.resolver';
import { ProjectListResolver } from '../../resolvers/project-list.resolver';
import { SectionListResolver } from '../../resolvers/section-list.resolver';
import { VenueListResolver } from '../../resolvers/venue-list.resolver';
import { AppointmentCategoryListResolver } from '../../resolvers/appointment-category-list.resolver';
import { AppointmentStatusListResolver } from '../../resolvers/appointment-status-list.resolver';
import { AppointmentParticipationPredictionListResolver } from '../../resolvers/appointment-participation-prediction-list.resolver';
import { AppointmentParticipationResultListResolver } from '../../resolvers/appointment-participation-result-list.resolver';
import { RoleNames } from '../../models/role-names';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { roles: [RoleNames.staff, RoleNames.admin] },
    component: AppointmentsComponent,
    resolve: {
      emoluments: AppointmentEmolumentListResolver,
      emolumentPatterns: AppointmentEmolumentPatternListResolver,
      expectations: AppointmentExpectationListResolver,
      projects: ProjectListResolver,
      sectionsLoaded: SectionListResolver,
      venues: VenueListResolver,
      categories: AppointmentCategoryListResolver,
      status: AppointmentStatusListResolver,
      predictions: AppointmentParticipationPredictionListResolver,
      results: AppointmentParticipationResultListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {
}
