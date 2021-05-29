import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserComponent } from './user/user.component';
import { MusicianComponent } from './musician/musician.component';
import { ProfileResolver } from './resolvers/profile.resolver';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { RoleNames } from '../../models/role-names';
import { AppointmentParticipationPredictionListResolver } from '../../core/resolvers/appointment-participation-prediction-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
      {
        path: 'user',
        component: UserComponent,
        resolve: {
          profile: ProfileResolver
        },
      },
      {
        path: 'appointments',
        component: MyAppointmentsComponent,
        data: { roles: [RoleNames.performer, RoleNames.staff, RoleNames.admin] },
        resolve: {
          predictions: AppointmentParticipationPredictionListResolver,
        },
      },
      {
        path: 'musician',
        component: MusicianComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
