import { ContactDetailsQuery } from './contactDetails.graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ContactDetailsDto } from './../../../../@arpa/models/contactDetailsDto';
import { Component } from '@angular/core';
import { Unsubscribe } from 'src/@arpa/decorators/unsubscribe.decorator';

@Component({
  selector: 'arpa-contact-details',
  templateUrl: './contactdetails-list.component.html',
  styleUrls: ['./contactdetails-list.component.scss']
})

@Unsubscribe()

export class ContactDetailsListComponent {


  query = ContactDetailsQuery;

  columns: ColumnDefinition<ContactDetailsDto>[] = [
    { label: 'KEY', property: 'key', type: 'text' },
    { label: 'VALUE', property: 'value', type: 'text'},
  ];

  constructor() { }

}
