import { Component} from '@angular/core';
import { AuditLogService } from '../../core/services/audit-log.service';
import { IAuditLog } from '../../models/IAuditLog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
  selector: 'arpa-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
})
export class AuditLogComponent {

  public auditLogs: Observable<IAuditLog[]>;

  constructor(private auditLogService: AuditLogService,
              private route: ActivatedRoute,
  ) {
    this.auditLogs = this.route.data.pipe<IAuditLog[]>(map((data) => data.auditLogs));
  }

  public getTypeName(type: number): string {
    return this.auditLogService.getTypeName(type);
  }

  public clear(ref: Table) {
    ref.clear();
  }

}
