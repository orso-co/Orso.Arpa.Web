import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProjectDto } from '../../../models/appointment';
import { SubSink } from 'subsink';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'arpa-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnDestroy {
  projects: IProjectDto[] = [];
  private subs = new SubSink();

  constructor(
    route: ActivatedRoute
  ) {
    this.subs.add(
      route.data.pipe(map((routeData) => routeData.projects)).subscribe((project) => (this.projects = this.filterActiveProjects(project))),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  filterActiveProjects(projects: IProjectDto[]): IProjectDto[] {
    return projects.filter((u) => !u.deleted) ?? null;
  }

}
