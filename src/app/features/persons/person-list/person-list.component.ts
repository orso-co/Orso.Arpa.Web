import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';

import { gql } from 'apollo-angular';

export const PersonQuery = gql`
  query Persons{
    persons(order: { createdAt: DESC }
    ) {

      pageInfo {
        hasNextPage,
        startCursor,
        endCursor,
        hasPreviousPage
      }

      edges {
        cursor,
        node {
          givenName
          surname
          aboutMe
        }
      }
    }
  }`;

@Component({
  selector: 'arpa-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})

@Unsubscribe()
export class PersonListComponent {

  persons: Observable<PersonDto[]>;
  query = PersonQuery;

  constructor() {}

  public clear(ref: Table) {
    ref.clear();
  }

}
