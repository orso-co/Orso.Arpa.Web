import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { API_URL } from '../models/api-url';
import { ISelectValueDto } from '../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class SelectValueService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/tables`;
  }

  get(tableName: string, propertyName: string): Observable<SelectItem[]> {
    return this.http.get<ISelectValueDto[]>(`${this.baseUrl}/${tableName}/properties/${propertyName}`).pipe(
      shareReplay(),
      map((dtos) => {
        return dtos.map((v) => this.mapSelectValueToSelectItem(v));
      })
    );
  }

  private mapSelectValueToSelectItem(selectValue: ISelectValueDto): SelectItem {
    return { label: selectValue.name, value: selectValue.id };
  }
}
