import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentSalaryListResolver } from './resolvers/appointment-salary-list.resolver';
import { AppointmentSalaryPatternListResolver } from './resolvers/appointment-salary-pattern-list.resolver';
import { AppointmentExpectationListResolver } from './resolvers/appointment-expectation-list.resolver';
import { SectionListResolver } from './resolvers/section-list.resolver';
import { AppointmentCategoryListResolver } from './resolvers/appointment-category-list.resolver';
import { AppointmentStatusListResolver } from './resolvers/appointment-status-list.resolver';
import { AppointmentParticipationResultListResolver } from './resolvers/appointment-participation-result-list.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { VenueService } from '../../shared/services/venue.service';
import { ProjectListResolver } from '../../shared/resolvers/project-list.resolver';
import { RoleNames } from '../../../@arpa/models/roleNames';
import { AppointmentParticipationPredictionListResolver } from './resolvers/appointment-participation-prediction-list.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { roles: [RoleNames.staff, RoleNames.admin] },
    component: AppointmentsComponent,
    resolve: {
      salaries: AppointmentSalaryListResolver,
      salaryPatterns: AppointmentSalaryPatternListResolver,
      expectations: AppointmentExpectationListResolver,
      projects: ProjectListResolver,
      sectionsLoaded: SectionListResolver,
      venues: VenueService,
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
