import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectGenreResolver } from './resolvers/project-genre.resolver';
import { ProjectTypeResolver } from './resolvers/project-type.resolver';
import { VenueService } from '../../shared/services/venue.service';
import { ProjectListResolver } from '../../shared/resolvers/project-list.resolver';
import { ProjectStateResolver } from './resolvers/project-status.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    resolve: {
      projects: ProjectListResolver,
      venues: VenueService,
      genres: ProjectGenreResolver,
      types: ProjectTypeResolver,
      status: ProjectStateResolver,
    },
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {
}
