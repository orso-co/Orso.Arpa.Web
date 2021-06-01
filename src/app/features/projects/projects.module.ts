import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { EditProjectComponent } from './edit-project/edit-project.component';
import {ProjectGenreResolver} from './resolvers/project-genre.resolver';
import {ProjectTypeResolver} from './resolvers/project-type.resolver';
import {ProjectStateResolver} from './resolvers/project-status.resolver';
import { ProjectParticipationComponent } from './project-participation/project-participation.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    EditProjectComponent,
    ProjectParticipationComponent,
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
    ProjectGenreResolver,
    ProjectTypeResolver,
    ProjectStateResolver,
  ]
})
export class ProjectsModule {
}
