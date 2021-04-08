import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectListResolver } from '../../resolvers/project-list.resolver';
import {VenueListResolver} from '../../resolvers/venue-list.resolver';
import {ProjectGenreResolver} from '../../resolvers/project-genre.resolver';
import {ProjectTypeResolver} from '../../resolvers/project-type.resolver';
import {ProjectStatusResolver} from '../../resolvers/project-status.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    resolve: {
      projects: ProjectListResolver,
      venues: VenueListResolver,
      genres: ProjectGenreResolver,
      types: ProjectTypeResolver,
      status: ProjectStatusResolver
    },
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {
}
