import { Component } from '@angular/core';
import { IProjectDto } from "../../../models/IProjectDto";
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
    route.data.pipe(map((routeData) => routeData.projects)).subscribe((projects) => (this.projects = projects));
  }

}
