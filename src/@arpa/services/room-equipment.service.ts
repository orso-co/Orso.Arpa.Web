import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RoomEquipmentDto, RoomEquipmentModifyBodyDto } from '@arpa/models';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomEquipmentService {
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/roomequipments';
  }

  loadById(id: string): Observable<RoomEquipmentDto[]> {
    return this.apiService.get<RoomEquipmentDto[]>(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }

  update(id: string, dto: RoomEquipmentModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${id}`, dto).pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }
}
