import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuproComponent } from './mupro.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProjectsComponent } from './projects/projects.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { MusicianProfileResolver } from './resolvers/musician-profile.resolver';
import { ProjectParticipationListResolver } from './resolvers/project-participation-list.resolver';
import { MusicianProfileAppointmentListResolver } from './resolvers/musician-profile-appointment-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: MuproComponent,
    children: [
      {
        path: ':personId/:musicianProfileId',
        component: ProfilesComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          musicianProfile: MusicianProfileResolver,
        },
        children: [
          {
            path: '',
            redirectTo: 'projects',
          },
          {
            path: '',
            outlet: 'modal',
            loadChildren: () =>
              import('../musician-profile-dialog/musician-profile-dialog.module').then((m) => m.MusicianProfileDialogModule),
          },
          {
            path: 'projects',
            component: ProjectsComponent,
            runGuardsAndResolvers: 'always',
            resolve: {
              projectParticipations: ProjectParticipationListResolver,
            },
          },
          {
            path: 'appointments',
            component: AppointmentsComponent,
            runGuardsAndResolvers: 'always',
            resolve: {
              musicianProfileAppointments: MusicianProfileAppointmentListResolver,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuProRoutingModule {}
