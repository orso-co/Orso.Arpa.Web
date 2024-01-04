import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { ProjectsQueryResponse } from '../project-list/projects.graphql';

@Component({
  selector: 'arpa-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss'],
})
export class ProjectLayoutComponent {
  project: ProjectsQueryResponse = this.config.data.project;
  typeOptions$: Observable<SelectItem[]> = this.config.data.type;
  genreOptions$: Observable<SelectItem[]> = this.config.data.genre;
  public index = 0;

  constructor(public config: DynamicDialogConfig) {}
}
