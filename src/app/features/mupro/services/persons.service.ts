import { Injectable } from '@angular/core';
import { ApiService } from '../../../../@arpa/services/api.service';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { ReducedPersonDto } from '@arpa/models';
import { HttpParams } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/persons';
  }

  public getPersons(): Observable<PersonDto[]> {
    return this.apiService.get<PersonDto[]>(this.baseUrl);
  }

  public getBirthdayChildren(): Observable<ReducedPersonDto[]> {
    const params = new HttpParams().set('birthday', new Date().toISOString());
    return this.apiService.get<ReducedPersonDto[]>(`${this.baseUrl}/reduced`, params).pipe(shareReplay());
  }

  public getPerson(id: string): Observable<PersonDto> {
    return this.apiService.get<PersonDto>(`${this.baseUrl}/${id}`);
  }

  public getMusicianProfilesForPerson(id: string): Observable<MusicianProfileDto[]> {
    return this.apiService.get<MusicianProfileDto[]>(`${this.baseUrl}/${id}/profiles/musician`);
  }

  public putMusicianProfile(id: string): Observable<MusicianProfileDto> {
    return this.apiService.put<MusicianProfileDto>(`${this.baseUrl}/${id}/profiles/musician`);
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonDto[] | PersonDto> {
    const { id } = route.data;
    return id ? this.getPerson(id) : this.getPersons();
  }
}
