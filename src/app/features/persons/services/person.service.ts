import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../@arpa/services/api.service';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { ReducedPersonDto } from 'src/@arpa/models/reducedPersonDto';
import { first, map, shareReplay } from 'rxjs/operators';
import { PersonModifyBodyDto } from 'src/@arpa/models/personModifyBodyDto';
import { PersonInviteResultDto } from 'src/@arpa/models/personInviteResultDto';
import { PersonQuery } from './person.graphql';
import { cloneDeep } from 'lodash-es';

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
    // return this.apiService.get<PersonDto>(`${this.baseUrl}/${id}`);
    return this.apollo.query({query: PersonQuery, variables: {id}})
      .pipe(
        first(),
        map((result:any) => {
          const person =  result.data.persons.items?.[0];
          return person ? cloneDeep(person) : {};
        })
      );
  }
  public invitePersons(ids: string[]): Observable<PersonInviteResultDto> {
    return this.apiService.post<PersonInviteResultDto>(`${this.baseUrl}/invite`, {personIds: ids}).pipe(shareReplay());
  }

  public create(person: PersonDto): Observable<PersonDto> {
    return this.apiService.post<PersonDto>(this.baseUrl, person);
  }

  public update(id: string, dto: PersonModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${id}`, dto).pipe(shareReplay());
  }

  public delete(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}`).pipe(shareReplay());
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
}
