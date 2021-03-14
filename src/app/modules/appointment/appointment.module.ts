import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './../prime-ng/prime-ng.module';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments/appointments.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { AppointmentParticipationResultListResolver } from 'src/app/resolvers/appointment-participation-result-list.resolver';
import { AppointmentParticipationPredictionListResolver } from 'src/app/resolvers/appointment-participation-prediction-list.resolver';
import { AppointmentStatusListResolver } from 'src/app/resolvers/appointment-status-list.resolver';
import { AppointmentCategoryListResolver } from 'src/app/resolvers/appointment-category-list.resolver';
import { AppointmentExpectationListResolver } from 'src/app/resolvers/appointment-expectation-list.resolver';
import { AppointmentEmolumentPatternListResolver } from 'src/app/resolvers/appointment-emolument-pattern-list.resolver';
import { AppointmentEmolumentListResolver } from 'src/app/resolvers/appointment-emolument-list.resolver';
import { SectionListResolver } from 'src/app/resolvers/section-list.resolver';
import { VenueListResolver } from 'src/app/resolvers/venue-list.resolver';
import { ProjectListResolver } from 'src/app/resolvers/project-list.resolver';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'de',
    }),
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
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
    ]),
  ],
  declarations: [AppointmentsComponent, EditAppointmentComponent],
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
export class AppointmentModule {}
