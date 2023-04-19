import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { ApiService } from '@arpa/services';
import { SelectValueDto } from '@arpa/models';

@Injectable({
  providedIn: 'root',
})
export class SelectValueService {
  private baseUrl: string;
  private selectValues = new Map<string, SelectItem[]>();

  constructor(private apiService: ApiService) {
    this.baseUrl = '/tables';
  }

  get(tableName: string, propertyName: string): Observable<SelectItem[]> {
    if (this.cacheContains(tableName, propertyName)) {
      return of(this.getFromCache(tableName, propertyName));
    }

    return this.apiService.get<SelectValueDto[]>(`${this.baseUrl}/${tableName}/properties/${propertyName}`).pipe(
      catchError((err) => []),
      shareReplay(),
      map((dtos) => dtos.map((v) => this.mapSelectValueToSelectItem(v))),
      tap((selectItems) => {
        this.selectValues.set(this.getMapKey(tableName, propertyName), selectItems);
        return selectItems;
      })
    );
  }

  private cacheContains(tableName: string, propertyName: string): boolean {
    return this.selectValues.has(this.getMapKey(tableName, propertyName));
  }

  private getFromCache(tableName: string, propertyName: string): SelectItem[] {
    return [...(this.selectValues.get(this.getMapKey(tableName, propertyName)) || [])];
  }

  private getMapKey(tableName: string, propertyName: string): string {
    return `${tableName}|${propertyName}`;
  }

  private mapSelectValueToSelectItem(selectValue: SelectValueDto): SelectItem {
    return { label: selectValue.name, value: selectValue.id };
  }
}
