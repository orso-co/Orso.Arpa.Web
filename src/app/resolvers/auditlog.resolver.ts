import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {AuditLogService} from '../core/services/audit-log.service';
import {IAuditLog} from '../models/IAuditLog';

@Injectable({ providedIn: 'root' })
export class AuditLogResolver implements Resolve<IAuditLog[]> {
  constructor(private auditLogService: AuditLogService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAuditLog[]> {
    return this.auditLogService.loadAll();
  }
}
