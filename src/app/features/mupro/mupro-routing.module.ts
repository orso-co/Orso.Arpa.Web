import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuproComponent } from './mupro.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { PersonsService } from './services/persons.service';
import { ProfileMusicianResolver } from './resolvers/profile-musician.resolver';
import { SectionsResolver } from '../profile/resolvers/sections.resolver';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: MuproComponent,
    children: [
      {
        path: ':personId',
        component: ProfilesComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          profiles: ProfileMusicianResolver,
          sections: SectionsResolver,
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
