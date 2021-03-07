import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<IUserProfileDto>(`${this.baseUrl}/profile`);
  }

  putProfile(profileDto: IUserProfileDto) {
    return this.http.put(`${this.baseUrl}/profile`, profileDto);
  }

  getMyAppointments(take: number | null, skip: number | null): Observable<IUserAppointmentListDto> {
    return this.http.get<IUserAppointmentListDto>(`${this.baseUrl}/appointments?limit=${take}&offset=${skip}`);
  }

  setAppointmentPrediction(appointmentId: string, predictionId: string) {
    return this.http.put(`${this.baseUrl}/appointments/${appointmentId}/participation/prediction/${predictionId}`, {});
  }
}
