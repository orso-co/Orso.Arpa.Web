import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDataComponent } from './my-data/my-data.component';
import { MusicianprofileComponent } from './musicianprofile/musicianprofile.component';
import { ProfileResolver } from './resolvers/profile.resolver';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { RoleNames } from '@arpa/models';
import { ProfileMusicianResolver } from './resolvers/profile-musician.resolver';
import { QRCodeComponent } from './qrcode/qrcode.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';

const routes: Routes = [
  {
    path: 'my-data',
    component: MyDataComponent,
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
    path: 'my-appointments',
    component: MyAppointmentsComponent,
    data: { roles: [RoleNames.performer, RoleNames.staff, RoleNames.admin] },
  },
  {
    path: 'my-projects',
    component: MyProjectsComponent,
    data: { roles: [RoleNames.performer], title: 'MY_PROJECTS' },
  },
  {
    path: 'musicianprofile',
    component: MusicianprofileComponent,
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
