import { SubSink } from 'subsink';
import { Component, Input, OnDestroy } from '@angular/core';
import { IProjectDto } from '../../../models/appointment';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnDestroy {
  @Input() projects: IProjectDto[] | null = [];
  private subs = new SubSink();

  constructor(
    route: ActivatedRoute,
  ) {
    if (route) {
      this.subs.add(
        route.data.pipe(map((routeData) => routeData.projects))
          .subscribe((project) => (this.projects = this.filterActiveProjects(project))),
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  filterActiveProjects(projects: IProjectDto[]): IProjectDto[] {
    return projects.filter((u) => !u.deleted) ?? null;
  }
}
