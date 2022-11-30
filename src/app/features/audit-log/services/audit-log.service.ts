import { Injectable } from '@angular/core';
import { ApiService } from '../../../../@arpa/services/api.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { AuditLogDto } from '@arpa/models';

@Injectable({
  providedIn: 'root',
})
export class AuditLogService {

  private baseUrl = '/auditlogs';

   constructor(private apiService: ApiService) {
  }

  load(skip: number = 0, take: number = 50): Observable<AuditLogDto[]> {
    const params = new HttpParams().appendAll({
      take: take.toString(),
      skip: skip.toString(),
    });
    return this.apiService.get<AuditLogDto[]>(this.baseUrl, params).pipe(
      shareReplay(),
    );
  }

  loadForEntity(id: string): Observable<AuditLogDto[]> {
    const params = new HttpParams().set('entityId', id).set('take', '50');
    return this.apiService.get<AuditLogDto[]>(this.baseUrl, params).pipe(shareReplay());
  }

}
