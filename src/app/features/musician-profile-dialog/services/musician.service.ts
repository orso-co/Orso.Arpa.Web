import { MusicianProfileModifyBodyDto } from './../../../../@arpa/models/musicianProfileModifyBodyDto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../@arpa/services/api.service';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { MusicianProfileDeactivationCreateDto } from '../../../../@arpa/models/musicianProfileDeactivationCreateDto';
import { MyMusicianProfileAddDocumentDto } from '../../../../@arpa/models/myMusicianProfileAddDocumentDto';
import { EducationDto } from '../../../../@arpa/models/educationDto';
import { EducationCreateDto } from '../../../../@arpa/models/educationCreateDto';
import { MyDoublingInstrumentModifyDto } from '../../../../@arpa/models/myDoublingInstrumentModifyDto';
import { MyDoublingInstrumentCreateDto } from '../../../../@arpa/models/myDoublingInstrumentCreateDto';

@Injectable({
  providedIn: 'root',
})
export class MusicianService {
  private baseUrl = '/profiles/musicians';
  private baseUrlPersons = '/persons';
  private baseUrlMe = '/me/profiles/musician';

  constructor(private apiService: ApiService) {}

  getProfile<T>(id?: string): Observable<MusicianProfileDto | MusicianProfileDto[]> | T {
    return this.apiService.get<MusicianProfileDto>(`${this.baseUrl}/${id}`);
  }

  getProfilesByPerson<T>(id?: string): Observable<MusicianProfileDto | MusicianProfileDto[]> | T {
    return this.apiService.get<MusicianProfileDto>(`${this.baseUrlPersons}/${id}/profiles/musician`);
  }

  createProfile(profile: MusicianProfileDto): Observable<any> {
    return this.apiService.post(`${this.baseUrlMe}`, profile);
  }

  deactivateProfile(id: any, data: MusicianProfileDeactivationCreateDto): Observable<any> {
    return this.apiService.post(`${this.baseUrl}/${id}/deactivation`, data);
  }

  activateProfile(id: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}/deactivation`);
  }

  updateProfile(profile: MusicianProfileDto): Observable<any> {
    const { id } = profile;
    return this.apiService.put(`${this.baseUrlMe}/${id}`, profile);
  }

  updatePersonProfile(id: string, profile: MusicianProfileModifyBodyDto): Observable<MusicianProfileDto> {
    return this.apiService.put<MusicianProfileDto>(`${this.baseUrl}/${id}`, profile);
  }

  addDocument(id: any, document: MyMusicianProfileAddDocumentDto): Observable<any> {
    const { documentId, ...data } = document;
    return this.apiService.post(`${this.baseUrlMe}/${id}/documents/${documentId}`, data);
  }

  removeDocument(id: any, documentId: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrlMe}/${id}/documents/${documentId}`);
  }

  addEducation(id: any, data: EducationCreateDto, isMeEndpoint: boolean): Observable<any> {
    return this.apiService.post(`${isMeEndpoint ? this.baseUrlMe : this.baseUrl}/${id}/educations`, data);
  }

  addDoublingInstrument(id: any, data: MyDoublingInstrumentCreateDto): Observable<any> {
    return this.apiService.post(`${this.baseUrlMe}/${id}/doublinginstruments`, data);
  }

  updateDoublingInstrument(
    profileId: any,
    instrumentId: string,
    data: MyDoublingInstrumentModifyDto,
    isMeEndpoint: boolean
  ): Observable<any> {
    return this.apiService.put(`${isMeEndpoint ? this.baseUrlMe : this.baseUrl}/${profileId}/doublinginstruments/${instrumentId}`, data);
  }

  removeDoublingInstrument(profileId: any, instrumentId: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${profileId}/doublinginstruments/${instrumentId}`);
  }

  getDoublingInstruments(id: any): Observable<any> {
    return this.apiService.get(`/sections/${id}/doublinginstruments`);
  }

  removeEducation(data: EducationDto): Observable<any> {
    return this.apiService.delete(`/educations/${data.id}`);
  }
}
