import { Injectable } from '@angular/core';
import { MusicianProfileAppointmentParticipationDto, MusicianProfileDto, PersonDto, ProjectParticipationDto } from '@arpa/models';
import { ApiService } from '@arpa/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MuproService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/profiles/musicians';
  }

  _person: PersonDto;

  get person(): PersonDto {
    return this._person;
  }

  set person(person: PersonDto) {
    this._person = person;
  }

  public getMusicianProfile(id: string): Observable<MusicianProfileDto> {
    return this.apiService.get<MusicianProfileDto>(`${this.baseUrl}/${id}`);
  }

  public getProjectParticipations(musicianProfileId: string): Observable<ProjectParticipationDto[]> {
    return this.apiService.get<ProjectParticipationDto[]>(`${this.baseUrl}/${musicianProfileId}/projectparticipations`);
  }

  public getAppointmentParticipations(musicianProfileId: string): Observable<MusicianProfileAppointmentParticipationDto[]> {
    return this.apiService.get<MusicianProfileAppointmentParticipationDto[]>(
      `${this.baseUrl}/${musicianProfileId}/appointmentparticipations`
    );
  }
}
