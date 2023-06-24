import { AuditLogDto } from '@arpa/models';
import { Component } from '@angular/core';
import { AuditLogQuery } from './audit-log.graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ProjectDto } from '@arpa/models';
import { DialogService } from 'primeng/dynamicdialog';
import { AuditDialogComponent } from '../audit-dialog/audit-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'arpa-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
})
export class AuditLogComponent {
  public query = AuditLogQuery;

  columns: ColumnDefinition<ProjectDto>[] = [
    { label: 'TABLE', property: 'tableName', type: 'text' },
    { label: 'TYPE', property: 'type', type: 'text' },
    { label: 'CHANGED_AT', property: 'createdAt', type: 'date' },
    { label: 'CHANGED_BY', property: 'createdBy', type: 'text' },
    { label: 'CHANGED_COLUMNS', property: 'changedColumns', type: 'text' },
  ];

  constructor(private dialogService: DialogService, private translate: TranslateService) {}

  onRowClick(auditLogDto: AuditLogDto) {
    this.dialogService.open(AuditDialogComponent, {
      data: {
        auditLogDto,
      },
      header: this.translate.instant('audit-log.DETAILS'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });
  }
}
