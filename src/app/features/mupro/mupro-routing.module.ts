import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuproComponent } from './mupro.component';
import { MuproProfilesComponent } from './mupro-profiles/mupro-profiles.component';
import { ProjectListComponent } from '../projects/project-list/project-list.component';
import { PersonsService } from './services/persons.service';
import { ProjectListResolver } from '../../core/resolvers/project-list.resolver';
import { ProfileMusicianResolver } from './resolvers/profile-musician.resolver';
import { SectionsResolver } from '../profile/resolvers/sections.resolver';

const routes: Routes = [
  {
    path: '',
    component: MuproComponent,
    resolve: { persons: PersonsService },
    children: [
      {
        path: ':id',
        component: MuproProfilesComponent,
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
            path: 'projects', component: ProjectListComponent,
            resolve: { projects: ProjectListResolver },
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
export class MuProRoutingModule {
}
