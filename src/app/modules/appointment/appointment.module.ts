import { PrimeNgModule } from './../prime-ng/prime-ng.module';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments/appointments.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,
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
        redirectTo: 'administration',
        pathMatch: 'full',
      },
      {
        path: 'administration',
        component: AppointmentsComponent,
        resolve: {
          // categories: AppointmentCategoriesResolver,
          // status: AppointmentStatusResolver,
          // emoluments: AppointmentEmolumentsResolver,
          // emolumentPatterns: AppointmentEmolumentPatternsResolver,
          // expectations: AppointmentExpectationsResolver,
        },
      },
      {
        path: 'administration/edit/:id',
        component: EditAppointmentComponent,
        resolve: {
          // appointment: AppointmentResolver,
          // projects: ProjectsResolver,
          // sections: SectionsResolver,
          // venues: VenuesResolver,
          // categories: AppointmentCategoriesResolver,
          // status: AppointmentStatusResolver,
          // emoluments: AppointmentEmolumentsResolver,
          // emolumentPatterns: AppointmentEmolumentPatternsResolver,
          // expectations: AppointmentExpectationsResolver,
          // predictions: AppointmentParticipationPredictionsResolver,
          // results: AppointmentParticipationResultsResolver,
        },
      },
    ]),
  ],
  declarations: [AppointmentsComponent, EditAppointmentComponent],
})
export class AppointmentModule {}
