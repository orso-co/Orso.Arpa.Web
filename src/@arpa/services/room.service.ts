import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {
  RoomDto,
  RoomEquipmentCreateBodyDto,
  RoomEquipmentDto,
  RoomModifyBodyDto,
  RoomSectionCreateBodyDto,
  RoomSectionDto,
} from '@arpa/models';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/rooms';
  }

  loadById(id: string): Observable<RoomDto> {
    return this.apiService.get<RoomDto>(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }

  update(id: string, dto: RoomModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${id}`, dto).pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }

  addRoomSection(roomId: string, roomSectionCreateBodyDto: RoomSectionCreateBodyDto): Observable<RoomSectionDto> {
    return this.apiService.post<RoomSectionDto>(`${this.baseUrl}/${roomId}/instruments`, roomSectionCreateBodyDto).pipe(shareReplay());
  }

  addRoomEquipment(roomId: string, roomEquipmentCreateBodyDto: RoomEquipmentCreateBodyDto): Observable<RoomEquipmentDto> {
    return this.apiService.post<RoomEquipmentDto>(`${this.baseUrl}/${roomId}/equipments`, roomEquipmentCreateBodyDto).pipe(shareReplay());
  }
}
