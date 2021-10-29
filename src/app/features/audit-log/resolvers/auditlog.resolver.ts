import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuditLogDto } from '../../../../@arpa/models/auditLogDto';
import { AuditLogService } from '../services/audit-log.service';

@Injectable({ providedIn: 'root' })
export class AuditLogResolver implements Resolve<AuditLogDto[]> {
  constructor(private auditLogService: AuditLogService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<AuditLogDto[]> {
    return this.auditLogService.load(0, 400);
  }
}
