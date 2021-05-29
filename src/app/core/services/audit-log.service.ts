import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {IAuditLog} from '../../models/IAuditLog';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {

  private baseUrl = '/auditlogs';

  private auditLogTypeMap = new Map<number, string>([
      [0, 'None'],
      [1, 'Create'],
      [2, 'Update'],
      [3, 'Delete'],
    ],
  );

  constructor(private apiService: ApiService) {}

  loadAll(): Observable<IAuditLog[]> {
    const params = new HttpParams().set('take', '50');
    return this.apiService.get<IAuditLog[]>(this.baseUrl, params).pipe(shareReplay());
  }

  loadForEntity(id: string): Observable<IAuditLog[]> {
    const params = new HttpParams().set('entityId', id).set('take', '50');
    return this.apiService.get<IAuditLog[]>(this.baseUrl, params).pipe(shareReplay());
  }

  public getTypeName(type: number): string {
    const name = this.auditLogTypeMap.get(type);
    return name ? name : 'Unknown';
  }

}
