import { Directive, HostListener, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuditLogService } from '../../core/services/audit-log.service';
import { AuditDialogComponent } from '../audit-dialog/audit-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { IAuditLog } from '../../models/IAuditLog';

@Directive({
  selector: '[arpaAuditDialog]',
})
export class AuditDialogDirective {

  @Input('arpaAuditDialog')
  resourceId?: string;
  @Input()
  auditDetail: IAuditLog;

  constructor(private dialogService: DialogService,
              private auditLogService: AuditLogService,
              private translate: TranslateService) {
  }

  @HostListener('click', ['$event'])
  public onClick($event: MouseEvent) {
    $event.preventDefault();
    this.dialogService.open(AuditDialogComponent, {
      data: {
        ...(this.auditDetail && { detail: this.auditDetail}),
        ...(this.resourceId && { entries: this.auditLogService.loadForEntity(this.resourceId as any)}),
      },
      header: this.translate.instant('auditlogs.DETAILS'),
    });
  }
}