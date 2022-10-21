import { Component, Input } from '@angular/core';
import { PersonDto } from '../../../../../../@arpa/models/personDto';

@Component({
  selector: 'arpa-person-profiles-member',
  templateUrl: './person-profiles-member.component.html',
  styleUrls: ['./person-profiles-member.component.scss']
})
export class PersonProfilesMemberComponent  {
  @Input() person: PersonDto | null;

  constructor() { }

}
