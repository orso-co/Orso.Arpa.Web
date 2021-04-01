import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import {ApiService} from './api.service';
import {IUserProfileDto} from '../../models/IUserProfileDto';
import {IUserAppointmentListDto} from '../../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private baseUrl = '/users/me';

  constructor(private apiService: ApiService) {
  }

  getMyProfile(): Observable<IUserProfileDto> {
    return this.apiService.get<IUserProfileDto>(`${this.baseUrl}/profile`).pipe(shareReplay());
  }

  putProfile(profileDto: IUserProfileDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/profile`, profileDto).pipe(shareReplay());
  }

  getMyAppointments(take: number | null, skip: number | null): Observable<IUserAppointmentListDto> {
    return this.apiService.get<IUserAppointmentListDto>(`${this.baseUrl}/appointments?limit=${take}&offset=${skip}`).pipe(shareReplay());
  }

  setAppointmentPrediction(appointmentId: string, predictionId: string): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/appointments/${appointmentId}/participation/prediction/${predictionId}`, {}).pipe(shareReplay());
  }
}
