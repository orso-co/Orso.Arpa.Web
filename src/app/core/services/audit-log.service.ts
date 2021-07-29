import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { AuditLogDto } from '../../model/auditLogDto';

@Injectable({
  providedIn: 'root',
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

  constructor(private apiService: ApiService) {
  }

  load(skip: number = 0, take: number = 50): Observable<AuditLogDto[]> {
    const params = new HttpParams().appendAll({
      take: take.toString(),
      skip: skip.toString(),
    });
    return this.apiService.get<AuditLogDto[]>(this.baseUrl, params).pipe(
      map((result) => result.map((entry: any) => ({
          ...entry,
          type: this.getTypeName(entry.type),
        } as AuditLogDto))),
      shareReplay(),
    );
  }

  loadForEntity(id: string): Observable<AuditLogDto[]> {
    const params = new HttpParams().set('entityId', id).set('take', '50');
    return this.apiService.get<AuditLogDto[]>(this.baseUrl, params).pipe(shareReplay());
  }

  public getTypeName(type: number): string {
    const name = this.auditLogTypeMap.get(type);
    return name ? name : 'Unknown';
  }

}
