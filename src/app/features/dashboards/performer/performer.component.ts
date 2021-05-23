import { Component } from '@angular/core';
import { IProjectDto } from "../../../models/IProjectDto";
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
    route.data.pipe(map((routeData) => routeData.projects)).subscribe((projects) => (this.projects = projects));
  }
}
