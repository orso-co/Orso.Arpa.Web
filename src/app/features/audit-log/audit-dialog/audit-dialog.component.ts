import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuditLogService } from '../services/audit-log.service';
import { AuditLogDto } from '../../../../@arpa/models/auditLogDto';

@Component({
  selector: 'arpa-audit-dialog',
  templateUrl: './audit-dialog.component.html',
  styleUrls: ['./audit-dialog.component.scss'],
})
export class AuditDialogComponent {

  public detail: AuditLogDto;
  public entries: Observable<AuditLogDto[]>;

  constructor(public config: DynamicDialogConfig, private auditLogService: AuditLogService) {
    this.detail = this.config.data.detail;
    this.entries = this.config.data.entries && this.config.data.entries.pipe(first()).subscribe();
  }

  public getTypeName(type: number): string {
    return this.auditLogService.getTypeName(type);
  }
}
