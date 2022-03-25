import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../@arpa/services/api.service';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { PerformerDto } from '../../../../@arpa/models/performerDto';

@Injectable({
  providedIn: 'root',
})
export class PerformerService {
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

  public create(person: PersonDto): Observable<PersonDto> {
    return this.apiService.post<PersonDto>(this.baseUrl, person);
  }

  public update(person: PersonDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${person.id}`, person);
  }


}
