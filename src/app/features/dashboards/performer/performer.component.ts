import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { IProjectDto } from '../../../models/appointment';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.scss'],
})
export class PerformerComponent implements OnDestroy {
  projects: IProjectDto[] = [];
  private subs = new SubSink();

  constructor(
    route: ActivatedRoute,
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
