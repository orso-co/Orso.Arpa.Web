import { Component } from '@angular/core';
import { AuditLogQuery } from './audit-log.graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ProjectDto } from '../../../../@arpa/models/projectDto';

@Component({
  selector: 'arpa-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
})
export class AuditLogComponent {

  public query = AuditLogQuery;

  columns: ColumnDefinition<ProjectDto>[] = [
    { label: 'TIME', property: 'createdAt', type: 'date' },
    { label: 'TABLE', property: 'tableName', type: 'text' },
    { label: 'TYPE', property: 'type', type: 'text' },
    { label: 'CHANGED_BY', property: 'createdBy', type: 'text' },
  ];

  constructor() {
  }

}
