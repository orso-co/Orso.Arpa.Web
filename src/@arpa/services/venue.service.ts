import { VenueModifyBodyDto, VenueCreateDto, VenueDto, RoomDto } from '@arpa/models';
import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@arpa/services';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/venues';
  }

  load(): Observable<VenueDto[]> {
    return this.apiService.get<VenueDto[]>(this.baseUrl).pipe(shareReplay());
  }

  loadRooms(venueId: string): Observable<RoomDto[]> {
    return this.apiService.get<RoomDto[]>(`${this.baseUrl}/${venueId}/rooms`).pipe(shareReplay());
  }

  resolve(route: ActivatedRouteSnapshot): Observable<VenueDto[]> {
    return this.load();
  }

  create(dto: VenueCreateDto): Observable<VenueDto> {
    return this.apiService.post<VenueDto>(this.baseUrl, dto).pipe(shareReplay());
  }

  update(id: string, dto: VenueModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${id}`, dto).pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }
}
