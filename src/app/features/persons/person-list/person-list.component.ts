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
    { label: 'FIRSTNAME', property: 'givenName', type: 'text' },
    { label: 'LASTNAME', property: 'surname', type: 'text' },
    { label: 'ABOUT_ME', property: 'aboutMe', type: 'text' },
  ];

  constructor() {
  }

}
