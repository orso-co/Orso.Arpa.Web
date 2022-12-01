import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuditLogService } from '../services/audit-log.service';
import { AuditLogDto } from '../../../../@arpa/models/auditLogDto';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'arpa-audit-dialog',
  templateUrl: './audit-dialog.component.html',
  styleUrls: ['./audit-dialog.component.scss'],
})
export class AuditDialogComponent {
  public detail: AuditLogDto;

  constructor(
    public config: DynamicDialogConfig,
    private translate: TranslateService,
    private auditLogService: AuditLogService) {
    this.detail = this.config.data.auditLogDto;
  }
}
