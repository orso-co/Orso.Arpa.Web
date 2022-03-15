import { VenueModifyBodyDto } from './../../../@arpa/models/venueModifyBodyDto';
import { VenueCreateDto } from './../../../@arpa/models/venueCreateDto';
import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../@arpa/services/api.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { VenueDto } from '../../../@arpa/models/venueDto';
import { RoomDto } from '../../../@arpa/models/roomDto';

@Injectable({
  providedIn: 'root',
})
export class VenueService implements Resolve<VenueDto[]> {
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
