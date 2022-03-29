import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../@arpa/services/api.service';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { ReducedPersonDto } from 'src/@arpa/models/reducedPersonDto';
import { map, tap, shareReplay } from 'rxjs/operators';
import { PersonModifyBodyDto } from 'src/@arpa/models/personModifyBodyDto';
import { ContactDetailCreateDto } from 'src/@arpa/models/contactDetailCreateDto';
import { ContactDetailModifyBodyDto } from 'src/@arpa/models/contactDetailModifyBodyDto';
import { ContactDetailDto } from 'src/@arpa/models/contactDetailDto';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService, private apollo: Apollo) {
    this.baseUrl = '/persons';
  }

  public getPersons(): Observable<PersonDto[]> {
    return this.apiService.get<PersonDto[]>(this.baseUrl);
  }

  public getPerson(id: string): Observable<PersonDto> {
    return this.apiService.get<PersonDto>(`${this.baseUrl}/${id}`);

  }
  public invitePersons(ids: string[]): Observable<PersonDto> {
    return this.apiService.post(`${this.baseUrl}/invite`, {personIds: ids});
  }

  public create(person: PersonDto): Observable<PersonDto> {
    return this.apiService.post<PersonDto>(this.baseUrl, person);
  }

  public update(id: string, dto: PersonModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${id}`, dto).pipe(shareReplay());
  }

  public searchPerson(query: string): Observable<ReducedPersonDto[]> {
    return this.apollo
      .watchQuery<any>({
        query: gql`query Persons(
          $skip: Int = 0,
          $take: Int = 11,
          $orderName: SortEnumType = ASC,
          $orderSurname: SortEnumType = ASC,
          $searchQuery: String = "${query}"){
          persons(
            skip: $skip,
            take: $take,
            order: {
              surname: $orderSurname
              givenName: $orderName
            },
            where: {
              or: [
                { surname: { contains:$searchQuery}}, { givenName: { contains: $searchQuery } }
              ]
            }
          ) {
            items {
              id
              givenName
              surname,
              displayName
            }
          }
        }`,
      })
      .valueChanges.pipe(map((result) => result.data.persons.items));
  }
  addContactDetail(personId: string, dto: ContactDetailCreateDto): Observable<ContactDetailDto> {
    return this.apiService.post<ContactDetailDto>(`${this.baseUrl}/${personId}/contactdetails`, dto).pipe(shareReplay());
  }

  updateContactDetail(id: string, dto: ContactDetailModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/contactdetails/${id}`, dto).pipe(shareReplay());
  }

  deleteContactDetail(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/contactdetails/${id}`).pipe(shareReplay());
  }
}
