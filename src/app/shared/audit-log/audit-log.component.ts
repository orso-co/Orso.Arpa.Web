import { Component, OnInit } from '@angular/core';
import {AuditLogService} from '../../core/services/audit-log.service';
import {IAuditLog} from '../../models/IAuditLog';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'arpa-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent {

  auditLogs: IAuditLog[];

  constructor(private auditLogService: AuditLogService,
              private route: ActivatedRoute
              ) {
    this.getRouteData();
  }

  private getRouteData(): void {
    this.route.data.pipe(first()).subscribe((data) => {
      this.auditLogs = data.auditLogs;
    });
  }

  getTypeName(type: number): string {
    return this.auditLogService.getTypeName(type);
  }

}
