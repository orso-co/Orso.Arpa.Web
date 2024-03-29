import {
  SetMyAppointmentParticipationPredictionDto,
  BankAccountModifyBodyDto,
  MyContactDetailModifyBodyDto,
  ContactDetailDto,
  MyContactDetailCreateDto,
  MyUserProfileDto,
  MyAppointmentListDto,
  MyProjectDto,
  MyProjectParticipationDto,
  BankAccountDto,
  BankAccountCreateBodyDto,
  RoleNames,
  MyProjectParticipationModifyBodyDto,
  MyAppointmentDto,
  MyMusicianProfileDto,
  AddressCreateBodyDto,
  AddressModifyBodyDto,
  AddressDto,
} from '@arpa/models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ApiService, AuthService } from '@arpa/services';

export interface GetAllProjectsResponse {
  userProjects: MyProjectDto[];
  totalRecordsCount: number;
}
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

  getMyAppointments(take: number | null, skip: number | null, passed: boolean = false): Observable<MyAppointmentListDto> {
    return this.apiService
      .get<MyAppointmentListDto>(`${this.baseUrl}/appointments?limit=${take}&offset=${skip}&passed=${passed}`)
      .pipe(shareReplay());
  }
  getMyAppointmentsByProject(projectId: string): Observable<MyAppointmentDto> {
    return this.apiService.get<MyAppointmentDto>(`${this.baseUrl}/appointments?${projectId}`).pipe(shareReplay());
  }

  getAllProjects(pageSize: number = 10, pageNumber: number = 1, includecompleted: boolean = false): Observable<GetAllProjectsResponse> {
    const skip = pageNumber * pageSize;
    return this.apiService
      .get<GetAllProjectsResponse>(`${this.baseUrl}/projects?limit=${pageSize}&offset=${skip}&includecompleted=${includecompleted}`)
      .pipe(shareReplay());
  }

  setAppointmentPrediction(appointmentId: string, dto: SetMyAppointmentParticipationPredictionDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/appointments/${appointmentId}/participation/prediction`, dto).pipe(shareReplay());
  }

  setProjectParticipationStatus(projectId: string, dto: MyProjectParticipationModifyBodyDto): Observable<MyProjectParticipationDto> {
    return this.apiService.put<MyProjectParticipationDto>(`${this.baseUrl}/projects/${projectId}/participation/`, dto).pipe(shareReplay());
  }

  getProfilesMusician(id?: string): Observable<MyMusicianProfileDto | MyMusicianProfileDto[]> {
    if (id) {
      return this.apiService.get<MyMusicianProfileDto>(`${this.baseUrl}/profiles/musician/${id}`).pipe(shareReplay());
    } else {
      return this.getMyMusicianProfiles();
    }
  }

  getMyMusicianProfiles(): Observable<MyMusicianProfileDto[]> {
    return this.apiService.get<MyMusicianProfileDto[]>(`${this.baseUrl}/profiles/musician`).pipe(shareReplay());
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

  addBankAccount(personId: any, dto: BankAccountCreateBodyDto): Observable<BankAccountDto> {
    return this.apiService.post<BankAccountDto>(`/persons/${personId}/bankaccounts`, dto).pipe(shareReplay());
  }

  updateBankAccount(id: string, dto: BankAccountModifyBodyDto): Observable<any> {
    return this.apiService.put(`/persons/${this.baseUrl}/bankaccounts/${id}`, dto).pipe(shareReplay());
  }

  deleteBankAccount(id: string, personId: any): Observable<any> {
    return this.apiService.delete(`/persons/${personId}/bankaccounts/${id}`).pipe(shareReplay());
  }

  addAddress(personId: any, dto: AddressCreateBodyDto): Observable<AddressDto> {
    return this.apiService.post<AddressDto>(`/persons/${personId}/addresses`, dto).pipe(shareReplay());
  }
  updateAddress(id: string, personId: any, dto: AddressModifyBodyDto): Observable<any> {
    return this.apiService.put(`/persons/${personId}/addresses/${id}`, dto).pipe(shareReplay());
  }

  deleteAddress(id: string | undefined, personId: any): Observable<any> {
    return this.apiService.delete(`/persons/${personId}/addresses/${id}`).pipe(shareReplay());
  }
}
