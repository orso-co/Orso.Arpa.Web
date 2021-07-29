import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditLogService } from '../core/services/audit-log.service';
import { AuditLogDto } from '../model/auditLogDto';

@Injectable({ providedIn: 'root' })
export class AuditLogResolver implements Resolve<AuditLogDto[]> {
  constructor(private auditLogService: AuditLogService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<AuditLogDto[]> {
    return this.auditLogService.load(0, 400);
  }
}
