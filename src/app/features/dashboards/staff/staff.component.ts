import { Component } from '@angular/core';
import { IProjectDto } from '../../../models/appointment';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'arpa-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent {
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
