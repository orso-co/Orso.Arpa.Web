import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { VenueDto } from '../../model/venueDto';
import { RoomDto } from '../../model/roomDto';

@Injectable({
  providedIn: 'root',
})
export class VenueService implements Resolve<VenueDto[]> {
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/venues';
  }

  load(): Observable<VenueDto[]> {
    return this.apiService.get<VenueDto[]>(this.baseUrl).pipe(
      shareReplay(),
    );
  }

  loadRooms(venueId: string): Observable<RoomDto[]> {
    return this.apiService.get<RoomDto[]>(`${this.baseUrl}/${venueId}/rooms`).pipe(shareReplay());
  }

  resolve(route: ActivatedRouteSnapshot): Observable<VenueDto[]> {
    return this.load();
  }
}
