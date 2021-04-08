import { Component } from '@angular/core';
import { IProjectDto } from '../../../models/appointment';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.scss'],
})
export class PerformerComponent {
  projects: IProjectDto[] = [];

  constructor(
    route: ActivatedRoute,
  ) {
    route.data.pipe(map((routeData) => routeData.projects)).subscribe((project) => (this.projects = this.filterActiveProjects(project)));
  }

  filterActiveProjects(projects: IProjectDto[]): IProjectDto[] {
    return projects.filter((u) => !u.deleted) ?? null;
  }
}
