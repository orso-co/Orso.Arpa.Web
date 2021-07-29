import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PersonDto } from '../../../model/personDto';

@Component({
  selector: 'arpa-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent {
  projects: PersonDto[] = [];

  constructor(route: ActivatedRoute) {
    route.data.pipe(map((routeData) => routeData.projects)).subscribe((projects) => (this.projects = projects));
  }
}
