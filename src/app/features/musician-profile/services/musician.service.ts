import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
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
  private baseUrlMe = '/me/profiles/musician';

  constructor(private apiService: ApiService) {
  }

  getProfile<T>(id?: string): Observable<MusicianProfileDto | MusicianProfileDto[]> | T {
    return this.apiService.get<MusicianProfileDto>(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }

  createProfile(profile: MusicianProfileDto): Observable<any> {
    return this.apiService.post(`${this.baseUrlMe}`, profile).pipe(shareReplay());
  }

  deactivateProfile(id: any, data: MusicianProfileDeactivationCreateDto): Observable<any> {
    return this.apiService.post(`${this.baseUrl}/${id}/deactivation`, data).pipe(shareReplay());
  }

  activateProfile(id: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}/deactivation`).pipe(shareReplay());
  }

  updateProfile(profile: MusicianProfileDto): Observable<any> {
    const { id } = profile;
    return this.apiService.put(`${this.baseUrlMe}/${id}`, profile).pipe(shareReplay());
  }

  addDocument(id: any, document: MyMusicianProfileAddDocumentDto): Observable<any> {
    const { documentId, ...data } = document;
    return this.apiService.post(`${this.baseUrlMe}/${id}/documents/${documentId}`, data).pipe(shareReplay());
  }

  removeDocument(id: any, documentId: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrlMe}/${id}/documents/${documentId}`).pipe(shareReplay());
  }

  addEducation(id: any, data: EducationCreateDto): Observable<any> {
    return this.apiService.post(`${this.baseUrlMe}/${id}/educations`, data).pipe(shareReplay());
  }

  addDoublingInstrument(id: any, data: MyDoublingInstrumentCreateDto): Observable<any> {
    return this.apiService.post(`${this.baseUrlMe}/${id}/doublinginstruments`, data).pipe(shareReplay());
  }

  updateDoublingInstrument(profileId: any, instrumentId: string, data: MyDoublingInstrumentModifyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrlMe}/${profileId}/doublinginstruments/${instrumentId}`, data).pipe(shareReplay());
  }

  removeDoublingInstrument(profileId: any, instrumentId: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${profileId}/doublinginstruments/${instrumentId}`).pipe(shareReplay());
  }

  getDoublingInstruments(id: any): Observable<any> {
    return this.apiService.get(`/sections/${id}/doublinginstruments`).pipe(shareReplay());
  }

  removeEducation(data: EducationDto): Observable<any> {
    return this.apiService.delete(`/educations/${data.id}`).pipe(shareReplay());
  }
}
