import { Component } from '@angular/core';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';
import { PersonsQuery } from './persons.graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ProjectDto } from '../../../../@arpa/models/projectDto';

@Component({
  selector: 'arpa-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})

@Unsubscribe()
export class PersonListComponent {

  query = PersonsQuery;

  columns: ColumnDefinition<ProjectDto>[] = [
    { label: 'SURNAME', property: 'surname', type: 'text' },
    { label: 'GIVEN_NAME', property: 'givenName', type: 'text' },
    { label: 'EXPERIENCE_LEVEL', property: 'experienceLevel', type: 'text', show: true },
    { label: 'RELIABILITY', property: 'reliability', type: 'text', show: true },
    { label: 'GENERAL_PREFERENCE', property: 'generalPreference', type: 'text', show: true },
    { label: 'CREATED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'CREATED_BY', property: 'createdBy', type: 'text', show: false },
    { label: 'MODIFIED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'MODIFIED_BY', property: 'modifiedBy', type: 'text', show: false },
  ];

  constructor() {
  }

}
