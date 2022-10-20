import { Component, Input } from '@angular/core';
import { PersonDto } from '../../../../../../@arpa/models/personDto';

@Component({
  selector: 'arpa-person-profiles-client',
  templateUrl: './person-profiles-client.component.html',
  styleUrls: ['./person-profiles-client.component.scss']
})
export class PersonProfilesClientComponent  {
  @Input() person: PersonDto | null;

  constructor() { }


}
