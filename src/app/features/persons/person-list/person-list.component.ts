import { PersonDto } from './../../../../@arpa/models/personDto';
import { Component } from '@angular/core';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';
import { PersonsQuery } from './persons.graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';

@Component({
  selector: 'arpa-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})

@Unsubscribe()
export class PersonListComponent {


  query = PersonsQuery;

  columns: ColumnDefinition<PersonDto>[] = [
    { label: 'SURNAME', property: 'surname', type: 'text' },
    { label: 'GIVEN_NAME', property: 'givenName', type: 'text' },
    // { label: 'ABOUT_ME', property: 'aboutMe', type: 'text' },
    { label: 'EXPERIENCE_LEVEL', property: 'experienceLevel', type: 'text' },
    { label: 'RELIABILITY', property: 'reliability', type: 'text' },
    { label: 'GENERAL_PREFERENCE', property: 'generalPreference', type: 'text' },
    { label: 'CREATED_AT', property: 'createdAt', type: 'date' },
    { label: 'CREATED_BY', property: 'createdBy', type: 'text' },
    { label: 'MODIFIED_AT', property: 'createdAt', type: 'date' },
    { label: 'MODIFIED_BY', property: 'modifiedBy', type: 'text' },

  ];

  constructor() {
  }

}
