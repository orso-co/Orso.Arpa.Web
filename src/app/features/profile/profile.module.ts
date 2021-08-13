import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { UserComponent } from './user/user.component';
import { MusicianComponent } from './musician/musician.component';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './resolvers/profile.resolver';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { CalendarSheetComponent } from './calendar-sheet/calendar-sheet.component';
import { AppointmentParticipationPredictionListResolver } from '../../core/resolvers/appointment-participation-prediction-list.resolver';

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    MyAppointmentsComponent,
    MusicianComponent,
    CalendarSheetComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    TranslateModule,
  ],
  providers: [
    ProfileService,
    ProfileResolver,
    AppointmentParticipationPredictionListResolver,
  ],
})
export class ProfileModule {
  constructor() {
  }
}
