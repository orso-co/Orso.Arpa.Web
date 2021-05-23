import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ISelectValueDto } from "../../models/ISelectValueDto";

@Injectable({
  providedIn: 'root',
})
export class SelectValueService {
  private baseUrl: string;
  private selectValues = new Map<string, SelectItem[]>();

  constructor(private apiService: ApiService) {
    this.baseUrl = '/tables';
  }

  load(tableName: string, propertyName: string): Observable<SelectItem[]> {
    return this.apiService.get<ISelectValueDto[]>(`${this.baseUrl}/${tableName}/properties/${propertyName}`).pipe(
      shareReplay(),
      map((dtos) => dtos.map((v) => this.mapSelectValueToSelectItem(v))),
      tap((selectItems) => this.selectValues.set(this.getMapKey(tableName, propertyName), selectItems)),
    );
  }

  loaded(tableName: string, propertyName: string): boolean {
    return this.selectValues.has(this.getMapKey(tableName, propertyName));
  }

  get(tableName: string, propertyName: string): SelectItem[] {
    return this.selectValues.get(this.getMapKey(tableName, propertyName)) || [];
  }

  private getMapKey(tableName: string, propertyName: string): string {
    return `${tableName}|${propertyName}`;
  }

  private mapSelectValueToSelectItem(selectValue: ISelectValueDto): SelectItem {
    return { label: selectValue.name, value: selectValue.id };
  }
}
