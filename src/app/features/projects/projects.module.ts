import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { EditProjectComponent } from './edit-project/edit-project.component';
import {VenueListResolver} from '../../resolvers/venue-list.resolver';
import {ProjectListResolver} from '../../resolvers/project-list.resolver';
import {ProjectGenreResolver} from '../../resolvers/project-genre.resolver';
import {ProjectTypeResolver} from '../../resolvers/project-type.resolver';
import {ProjectStatusResolver} from '../../resolvers/project-status.resolver';

@NgModule({
  declarations: [
    ProjectListComponent,
    EditProjectComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
  ],
  exports: [
    ProjectListComponent,
  ],
  providers: [
    VenueListResolver,
    ProjectListResolver,
    ProjectGenreResolver,
    ProjectTypeResolver,
    ProjectStatusResolver
  ]
})
export class ProjectsModule {
}
