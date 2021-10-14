import { NgModule } from '@angular/core';
import { MusicianDialogEntryComponent } from './musician-dialog-entry/musician-dialog-entry.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileResolver } from './resolvers/musician.resolver';
import { SectionsResolver } from './resolvers/sections.resolver';
import { ProfileMusicianResolver } from '../profile/resolvers/profile-musician.resolver';
import { ProfilesResolver } from './resolvers/profiles.resolver';

const routes: Routes = [
  {
    path: 'create',
    component: MusicianDialogEntryComponent,
    resolve: {
      profiles: ProfileMusicianResolver,
      sections: SectionsResolver,
    },
  },
  {
    path: 'me/:id',
    component: MusicianDialogEntryComponent,
    resolve: {
      profiles: ProfilesResolver,
      musicianProfile: ProfileResolver,
      sections: SectionsResolver,
    },
  },
  {
    path: ':id',
    component: MusicianDialogEntryComponent,
    resolve: {
      profiles: ProfilesResolver,
      musicianProfile: ProfileResolver,
      sections: SectionsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicianRoutingModule {
}
