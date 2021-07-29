import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PersonDto } from '../../../model/personDto';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';

@Injectable({
  providedIn: 'root',
})
export class PersonsService implements Resolve<PersonDto[] | PersonDto> {

  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/persons';
  }

  public getPersons(): Observable<PersonDto[]> {
    return this.apiService.get<PersonDto[]>(this.baseUrl);
  }

  public getPerson(id: string): Observable<PersonDto> {
    return this.apiService.get<PersonDto>(`${this.baseUrl}/${id}`);
  }

  public getMusicianProfile(id: string): Observable<MusicianProfileDto> {
    return this.apiService.get<MusicianProfileDto>(`${this.baseUrl}/${id}/profiles/musician`);
  }

  public putMusicianProfile(id: string): Observable<MusicianProfileDto> {
    return this.apiService.put<MusicianProfileDto>(`${this.baseUrl}/${id}/profiles/musician`);
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonDto[] | PersonDto> {
    const { id } = route.data;
    return id ? this.getPerson(id) : this.getPersons();
  }
}
