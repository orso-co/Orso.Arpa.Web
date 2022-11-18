import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentSalaryListResolver } from './resolvers/appointment-salary-list.resolver';
import { AppointmentSalaryPatternListResolver } from './resolvers/appointment-salary-pattern-list.resolver';
import { AppointmentExpectationListResolver } from './resolvers/appointment-expectation-list.resolver';
import { SectionListResolver } from './resolvers/section-list.resolver';
import { AppointmentCategoryListResolver } from './resolvers/appointment-category-list.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { VenueService } from '@arpa/services';
import { ProjectListResolver } from './resolvers/project-list.resolver';
import { RoleNames } from '@arpa/models';

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
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {
}
