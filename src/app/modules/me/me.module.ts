import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarSheetModule } from './../../ui/calendar-sheet/calendar-sheet.module';
import { PrimeNgModule } from './../prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { AppointmentParticipationPredictionListResolver } from 'src/app/resolvers/appointment-participation-prediction-list.resolver';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,
    CalendarSheetModule,
    FormsModule,
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
        path: 'appointments',
        component: MyAppointmentsComponent,
        resolve: {
          predictions: AppointmentParticipationPredictionListResolver,
        },
      },
    ]),
  ],
  declarations: [MyAppointmentsComponent],
  providers: [AppointmentParticipationPredictionListResolver]
})
export class MeModule {}
