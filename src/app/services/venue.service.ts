import { shareReplay } from 'rxjs/operators';
import { IRoomDto, IVenueDto } from './../models/appointment';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../models/api-url';

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/venues`;
  }

  load(): Observable<IVenueDto[]> {
    return this.http.get<IVenueDto[]>(this.baseUrl).pipe(
      shareReplay()
    );
  }

  loadRooms(venueId: string): Observable<IRoomDto[]> {
    return this.http.get<IRoomDto[]>(`${this.baseUrl}/${venueId}/rooms`).pipe(shareReplay());
  }
}
