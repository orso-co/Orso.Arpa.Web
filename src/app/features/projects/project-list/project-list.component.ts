import { Component, Input } from '@angular/core';
import { IProjectDto } from '../../../models/appointment';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'arpa-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  @Input() projects: IProjectDto[] | null = [];

  constructor(
    route: ActivatedRoute,
  ) {
    if (route) {
      route.data.pipe(map((routeData) => routeData.projects))
        .pipe(first())
        .subscribe((project) => (this.projects = this.filterActiveProjects(project)));
    }
  }

  filterActiveProjects(projects: IProjectDto[]): IProjectDto[] {
    return projects.filter((u) => !u.deleted) ?? null;
  }
}
