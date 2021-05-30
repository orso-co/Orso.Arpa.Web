import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ApiService } from './api.service';
import { IUserProfileDto } from '../../models/IUserProfileDto';
import { IMusicianProfileDto, IUserAppointmentListDto } from '../../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private baseUrl = '/me';

  constructor(private apiService: ApiService) {
  }

  getMyProfile(): Observable<IUserProfileDto> {
    return this.apiService.get<IUserProfileDto>(`${this.baseUrl}/profiles/user`).pipe(shareReplay());
  }

  putProfile(profileDto: IUserProfileDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/profiles/user`, profileDto).pipe(shareReplay());
  }

  getMyAppointments(take: number | null, skip: number | null): Observable<IUserAppointmentListDto> {
    return this.apiService.get<IUserAppointmentListDto>(
      `${this.baseUrl}/appointments?limit=${take}&offset=${skip}`,
    ).pipe(shareReplay());
  }

  setAppointmentPrediction(appointmentId: string, predictionId: string): Observable<any> {
    return this.apiService.put(
      `${this.baseUrl}/appointments/${appointmentId}/participation/prediction/${predictionId}`
      , {},
    ).pipe(shareReplay());
  }

  getProfileMusician<T>(id?: string): Observable<IMusicianProfileDto | IMusicianProfileDto[]> | T {
    if (id) {
      return this.apiService.get<IMusicianProfileDto>(`${this.baseUrl}/profiles/musician/${id}`).pipe(shareReplay());
    } else {
      return this.apiService.get<IMusicianProfileDto[]>(`${this.baseUrl}/profiles/musician`).pipe(shareReplay());
    }
  }

  putProfileMusician(profileMusician: IMusicianProfileDto): Observable<any> {
    return this.apiService.post(`${this.baseUrl}/profiles/musician`, profileMusician).pipe(shareReplay());
  }
}
