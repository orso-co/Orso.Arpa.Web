import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../../@arpa/services/api.service';
import { shareReplay } from 'rxjs/operators';
import { MusicianProfileCreateDto } from '../../../../../@arpa/models/musicianProfileCreateDto';
import { MusicianProfileDto } from '../../../../../@arpa/models/musicianProfileDto';
import { MusicianProfileModifyBodyDto } from '../../../../../@arpa/models/musicianProfileModifyBodyDto';

@Injectable({
  providedIn: 'root',
})
export class MuproService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService, private apollo: Apollo) {
    this.baseUrl = '/persons';
  }
  addMusicianProfile(personId: string, dto: MusicianProfileCreateDto): Observable<MusicianProfileDto> {
    return this.apiService.post<MusicianProfileDto>(`${this.baseUrl}/${personId}/musician`, dto).pipe(shareReplay());
  }

  updateMusicianProfile(personId: string, id: string, dto: MusicianProfileModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${personId}/musician/${id}`, dto).pipe(shareReplay());
  }

  deleteMusicianProfile(id: string, personId: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${personId}/musician/${id}`).pipe(shareReplay());
  }
}
