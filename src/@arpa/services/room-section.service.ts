import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RoomSectionDto, RoomSectionModifyBodyDto } from '@arpa/models';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomSectionService {
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/roomsections';
  }

  loadById(id: string): Observable<RoomSectionDto> {
    return this.apiService.get<RoomSectionDto>(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }

  update(id: string, dto: RoomSectionModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${id}`, dto).pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }
}
