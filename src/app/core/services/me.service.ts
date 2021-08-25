import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ApiService } from './api.service';
import { MyUserProfileDto } from '../../model/myUserProfileDto';
import { MyAppointmentListDto } from '../../model/myAppointmentListDto';
import { MusicianProfileDto } from '../../model/musicianProfileDto';
import { SetMyProjectParticipationBodyDto } from '../../model/setMyProjectParticipationBodyDto';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private baseUrl = '/me';

  constructor(private apiService: ApiService) {
  }

  getMyProfile(): Observable<MyUserProfileDto> {
    return this.apiService.get<MyUserProfileDto>(`${this.baseUrl}/profiles/user`).pipe(shareReplay());
  }

  putProfile(profileDto: MyUserProfileDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/profiles/user`, profileDto).pipe(shareReplay());
  }

  getMyAppointments(take: number | null, skip: number | null): Observable<MyAppointmentListDto> {
    return this.apiService.get<MyAppointmentListDto>(
      `${this.baseUrl}/appointments?limit=${take}&offset=${skip}`,
    ).pipe(shareReplay());
  }

  setAppointmentPrediction(appointmentId: string, predictionId: string): Observable<any> {
    return this.apiService.put(
      `${this.baseUrl}/appointments/${appointmentId}/participation/prediction/${predictionId}`
      , {},
    ).pipe(shareReplay());
  }

  getProfileMusician<T>(id?: string): Observable<MusicianProfileDto | MusicianProfileDto[]> | T {
    if (id) {
      return this.apiService.get<MusicianProfileDto>(`${this.baseUrl}/profiles/musician/${id}`).pipe(shareReplay());
    } else {
      return this.apiService.get<MusicianProfileDto[]>(`${this.baseUrl}/profiles/musician`).pipe(shareReplay());
    }
  }

  createProfileMusician(profileMusician: MusicianProfileDto): Observable<any> {
    return this.apiService.post(`${this.baseUrl}/profiles/musician`, profileMusician).pipe(shareReplay());
  }

  updateProfileMusician(profileMusician: MusicianProfileDto): Observable<any> {
    const { id } = profileMusician;
    return this.apiService.put(`${this.baseUrl}/profiles/musician/${id}`, profileMusician).pipe(shareReplay());
  }

  putProjectParticipation<T>(id: string, projectId: string, data: SetMyProjectParticipationBodyDto) {
    return this.apiService
      .put<T>(
        `${this.baseUrl}/profiles/musician/${id}/projects/${projectId}/participation`,
        data,
      ).pipe(shareReplay());
  }
}
