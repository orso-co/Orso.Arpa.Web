import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PersonDto } from '../../../model/personDto';

@Component({
  selector: 'arpa-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.scss'],
})
export class PerformerComponent {
  projects: PersonDto[] = [];

  constructor(route: ActivatedRoute) {
    route.data.pipe(map((routeData) => routeData.projects)).subscribe((projects) => (this.projects = projects));
  }
}
