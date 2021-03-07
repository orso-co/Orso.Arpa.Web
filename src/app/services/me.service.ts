import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { API_URL } from '../models/api-url';
import { IUserAppointmentListDto } from '../models/appointment';
import { IUserProfileDto } from '../models/IUserProfileDto';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/users/me`;
  }

  getMyProfile(): Observable<IUserProfileDto> {
    return this.http.get<IUserProfileDto>(`${this.baseUrl}/profile`).pipe(shareReplay());
  }

  putProfile(profileDto: IUserProfileDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, profileDto).pipe(shareReplay());
  }

  getMyAppointments(take: number | null, skip: number | null): Observable<IUserAppointmentListDto> {
    return this.http.get<IUserAppointmentListDto>(`${this.baseUrl}/appointments?limit=${take}&offset=${skip}`).pipe(shareReplay());
  }

  setAppointmentPrediction(appointmentId: string, predictionId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/appointments/${appointmentId}/participation/prediction/${predictionId}`, {}).pipe(shareReplay());
  }
}
