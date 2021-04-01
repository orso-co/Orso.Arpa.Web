import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { AppointmentParticipationPredictionListResolver } from '../../resolvers/appointment-participation-prediction-list.resolver';
import { SharedModule } from '../../shared/shared.module';
import { CalendarSheetComponent } from './calendar-sheet/calendar-sheet.component';
import { RoleNames } from '../../models/role-names';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: 'appointments',
        component: MyAppointmentsComponent,
        data: { roles: [RoleNames.performer, RoleNames.staff, RoleNames.admin] },
        resolve: {
          predictions: AppointmentParticipationPredictionListResolver,
        },
      },
    ]),
  ],
  declarations: [MyAppointmentsComponent, CalendarSheetComponent],
  providers: [AppointmentParticipationPredictionListResolver],
})
export class MeModule {
}
