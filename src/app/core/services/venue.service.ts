import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IRoomDto, IVenueDto } from '../../models/appointment';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VenueService implements Resolve<IVenueDto[]> {
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/venues';
  }

  load(): Observable<IVenueDto[]> {
    return this.apiService.get<IVenueDto[]>(this.baseUrl).pipe(
      shareReplay(),
    );
  }

  loadRooms(venueId: string): Observable<IRoomDto[]> {
    return this.apiService.get<IRoomDto[]>(`${this.baseUrl}/${venueId}/rooms`).pipe(shareReplay());
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IVenueDto[]> {
    return this.load();
  }
}
