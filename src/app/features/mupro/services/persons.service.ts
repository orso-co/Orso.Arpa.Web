import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { IMusicianProfileDto, IPersonDto } from '../../../models/appointment';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PersonsService implements Resolve<IPersonDto[] | IPersonDto> {

  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/persons';
  }

  public getPersons(): Observable<IPersonDto[]> {
    return this.apiService.get<IPersonDto[]>(this.baseUrl);
  }

  public getPerson(id: string): Observable<IPersonDto> {
    return this.apiService.get<IPersonDto>(`${this.baseUrl}/${id}`);
  }

  public getMusicianProfile(id: string): Observable<IMusicianProfileDto> {
    return this.apiService.get<IMusicianProfileDto>(`${this.baseUrl}/${id}/profiles/musician`);
  }

  public putMusicianProfile(id: string): Observable<IMusicianProfileDto> {
    return this.apiService.put<IMusicianProfileDto>(`${this.baseUrl}/${id}/profiles/musician`);
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPersonDto[] | IPersonDto> {
    const { id } = route.data;
    return id ? this.getPerson(id) : this.getPersons();
  }
}
