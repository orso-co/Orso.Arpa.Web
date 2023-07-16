import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { MusicianComponent } from './musician/musician.component';
import { ProfileResolver } from './resolvers/profile.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { RoleNames } from '@arpa/models';
import { ProfileMusicianResolver } from './resolvers/profile-musician.resolver';
import { SectionsResolver } from './resolvers/sections.resolver';
import { QRCodeComponent } from './qrcode/qrcode.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    resolve: {
      profile: ProfileResolver,
    },
  },
  {
    path: 'qrcode',
    component: QRCodeComponent,
    data: { roles: [RoleNames.performer] },
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    data: { roles: [RoleNames.performer, RoleNames.staff, RoleNames.admin] },
  },
  {
    path: 'my-projects',
    component: MyProjectsComponent,
    data: { roles: [RoleNames.performer], title: 'MY_PROJECTS' },
  },
  {
    path: 'musician',
    component: MusicianComponent,
    resolve: {
      profiles: ProfileMusicianResolver,
    },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        outlet: 'modal',
        loadChildren: () => import('../musician-profile-dialog/musician-profile-dialog.module').then((m) => m.MusicianProfileDialogModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
