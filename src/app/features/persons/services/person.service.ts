import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../@arpa/services/api.service';
import { PersonDto } from '../../../../@arpa/models/personDto';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/persons';
  }

  public getPersons(): Observable<PersonDto[]> {

    return this.apiService.get<PersonDto[]>(this.baseUrl);
  }

  public create(person: PersonDto): Observable<PersonDto> {
    return this.apiService.post<PersonDto>(this.baseUrl, person);
  }

  public update(person: PersonDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${person.id}`, person);
  }


}
