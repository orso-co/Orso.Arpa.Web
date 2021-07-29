import { Component } from '@angular/core';
import { AuditLogService } from '../../core/services/audit-log.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { AuditLogDto } from '../../model/auditLogDto';

@Component({
  selector: 'arpa-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss'],
})
export class AuditLogComponent {

  public auditLogs: Observable<AuditLogDto[]>;

  constructor(private auditLogService: AuditLogService,
              private route: ActivatedRoute,
  ) {
    this.auditLogs = this.route.data.pipe<AuditLogDto[]>(map((data) => data.auditLogs));
  }

  public clear(ref: Table) {
    ref.clear();
  }

}
