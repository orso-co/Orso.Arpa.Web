import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuproComponent } from './mupro.component';
import { UserListResolver } from '../../resolvers/user-list.resolver';
import { MuproProfilesComponent } from './mupro-profiles/mupro-profiles.component';
import { ProjectListResolver } from '../../resolvers/project-list.resolver';
import { ProjectListComponent } from '../projects/project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    component: MuproComponent,
    resolve: { users: UserListResolver },
    children: [
      {
        path: ':id',
        component: MuproProfilesComponent,
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
