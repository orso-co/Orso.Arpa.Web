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
          // predictions: AppointmentParticipationPredictionsResolver,
        },
      },
    ]),
  ],
  declarations: [MyAppointmentsComponent],
})
export class MeModule {}
