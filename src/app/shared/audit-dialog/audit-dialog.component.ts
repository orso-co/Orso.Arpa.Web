import { Component} from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAuditLog } from '../../models/IAuditLog';
import { AuditLogService } from '../../core/services/audit-log.service';

@Component({
  selector: 'arpa-audit-dialog',
  templateUrl: './audit-dialog.component.html',
  styleUrls: ['./audit-dialog.component.scss']
})
export class AuditDialogComponent {

  public detail: IAuditLog;
  public entries: Observable<IAuditLog[]>;

  constructor(public config: DynamicDialogConfig, private auditLogService: AuditLogService) {
    this.detail = this.config.data.detail;
    this.entries = this.config.data.entries && this.config.data.entries.pipe(first()).subscribe();
  }

  public getTypeName(type: number): string {
    return this.auditLogService.getTypeName(type);
  }
}