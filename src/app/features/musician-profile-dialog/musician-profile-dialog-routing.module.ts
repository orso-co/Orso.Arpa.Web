import { NgModule } from '@angular/core';
import { MusicianDialogEntryComponent } from './musician-dialog-entry/musician-dialog-entry.component';
import { RouterModule, Routes } from '@angular/router';
import { SelectedProfileResolver } from './resolvers/musician.resolver';
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
    path: 'me/:profileId',
    component: MusicianDialogEntryComponent,
    resolve: {
      profiles: ProfilesResolver,
      selectedProfile: SelectedProfileResolver,
      sections: SectionsResolver,
    },
  },
  {
    path: ':personId/:profileId',
    component: MusicianDialogEntryComponent,
    resolve: {
      profiles: ProfilesResolver,
      selectedProfile: SelectedProfileResolver,
      sections: SectionsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicianProfileDialogRoutingModule {
}
