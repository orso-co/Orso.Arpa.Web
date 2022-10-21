import { Component, Input } from '@angular/core';
import { PersonDto } from '../../../../../@arpa/models/personDto';


@Component({
  selector: 'arpa-person-profiles',
  templateUrl: './person-profiles.component.html',
  styleUrls: ['./person-profiles.component.scss']
})
export class PersonProfilesComponent  {
  @Input() person: PersonDto |null;

  constructor() {}


}
