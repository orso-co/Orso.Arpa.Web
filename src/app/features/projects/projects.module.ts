import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { EditProjectComponent } from './edit-project/edit-project.component';

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
})
export class ProjectsModule {
}
