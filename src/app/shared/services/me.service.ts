import { MyContactDetailModifyBodyDto } from './../../../@arpa/models/myContactDetailModifyBodyDto';
import { ContactDetailDto } from './../../../@arpa/models/contactDetailDto';
import { MyContactDetailCreateDto } from './../../../@arpa/models/myContactDetailCreateDto';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../../../@arpa/services/api.service';
import { MyUserProfileDto } from '../../../@arpa/models/myUserProfileDto';
import { MyAppointmentListDto } from '../../../@arpa/models/myAppointmentListDto';
import { MyProjectDto, MyProjectParticipationDto } from 'src/@arpa/models/myProjectDto';
import { MusicianProfileDto } from '../../../@arpa/models/musicianProfileDto';
import { MyProjectParticipationModifyBodyDto } from '../../../@arpa/models/myProjectParticipationModifyBodyDto';
import { AuthService } from '../../../@arpa/services/auth.service';
import { RoleNames } from '../../../@arpa/models/roleNames';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private baseUrl = '/me';

  constructor(private apiService: ApiService, private authService: AuthService) {}

  getMyProfile(): Observable<MyUserProfileDto> {
    return this.apiService.get<MyUserProfileDto>(`${this.baseUrl}/profiles/user`).pipe(shareReplay());
  }

  getMyQrCode(fetch: boolean = false, sendEmail = false): Observable<string> {
    return this.authService.isUserInAtLeastOnRole([RoleNames.performer]).pipe(
      switchMap((hasRole) => {
        if (!hasRole) {
          return of('');
        }
        const storedQr = localStorage.getItem('qrCode');
        if (!fetch && storedQr) {
          return of<string>(storedQr).pipe(finalize(() => ({})));
        } else {
          return this.apiService
            .get<string>(`${this.baseUrl}/qrcode?sendEmail=${sendEmail}`, undefined, undefined, 'body', 'arraybuffer')
            .pipe(
              first(),
              map((buffer: any) =>
                btoa(
                  Array.from(new Uint8Array(buffer))
                    .map((b) => String.fromCharCode(b))
                    .join('')
                )
              ),
              tap((result) => {
                localStorage.setItem('qrCode', result);
              })
            );
        }
      })
    );
  }

  putProfile(profileDto: MyUserProfileDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/profiles/user`, profileDto).pipe(shareReplay());
  }

  getMyAppointments(take: number | null, skip: number | null): Observable<MyAppointmentListDto> {
    return this.apiService.get<MyAppointmentListDto>(`${this.baseUrl}/appointments?limit=${take}&offset=${skip}`).pipe(shareReplay());
  }

  getMyProjects(): Observable<MyProjectDto[]> {
    return this.apiService.get<MyProjectDto[]>(`${this.baseUrl}/projects`).pipe(shareReplay());
  }

  setAppointmentPrediction(appointmentId: string, predictionId: string): Observable<any> {
    return this.apiService
      .put(`${this.baseUrl}/appointments/${appointmentId}/participation/prediction/${predictionId}`, {})
      .pipe(shareReplay());
  }

  setProjectParticipationStatus(projectId: string, dto: MyProjectParticipationModifyBodyDto): Observable<MyProjectParticipationDto> {
    return this.apiService.put<MyProjectParticipationDto>(`${this.baseUrl}/projects/${projectId}/participation/`, dto).pipe(shareReplay());
  }

  getProfilesMusician<T>(id?: string): Observable<MusicianProfileDto | MusicianProfileDto[]> | T {
    if (id) {
      return this.apiService.get<MusicianProfileDto>(`${this.baseUrl}/profiles/musician/${id}`).pipe(shareReplay());
    } else {
      return this.apiService.get<MusicianProfileDto[]>(`${this.baseUrl}/profiles/musician`).pipe(shareReplay());
    }
  }

  putProjectParticipation<T>(id: string, projectId: string, data: MyProjectParticipationModifyBodyDto) {
    return this.apiService.put<T>(`${this.baseUrl}/profiles/musician/${id}/projects/${projectId}/participation`, data).pipe(shareReplay());
  }

  cleanStorage() {
    localStorage.removeItem('qrCode');
  }

  addContactDetail(dto: MyContactDetailCreateDto): Observable<ContactDetailDto> {
    return this.apiService.post<ContactDetailDto>(`${this.baseUrl}/contactdetails`, dto).pipe(shareReplay());
  }

  updateContactDetail(id: string, dto: MyContactDetailModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/contactdetails/${id}`, dto).pipe(shareReplay());
  }

  deleteContactDetail(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/contactdetails/${id}`).pipe(shareReplay());
  }
}
