import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@arpa/services';
import { PersonDto, ReducedPersonDto, PersonModifyBodyDto, PersonInviteResultDto } from '@arpa/models';
import { map, shareReplay } from 'rxjs/operators';
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
    return this.apollo.query({ query: PersonQuery, variables: { id }, fetchPolicy: 'no-cache' }).pipe(
      shareReplay(),
      map((result: any) => {
        const person = result.data.persons.items?.[0];
        return person ? cloneDeep(person) : {};
      })
    );
  }
  public invitePersons(ids: string[]): Observable<PersonInviteResultDto> {
    return this.apiService.post<PersonInviteResultDto>(`${this.baseUrl}/invite`, { personIds: ids }).pipe(shareReplay());
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

  getProfilePicture(id: string, sizeInPixels: number): Observable<any> {
    return this.apiService.get(
      `${this.baseUrl}/${id}/profilepicture?width=${sizeInPixels}&height=${sizeInPixels}&rsampler=nearest&rmode=stretch`,
      undefined,
      undefined,
      undefined,
      'blob'
    );
  }

  deleteProfilePicture(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}/profilepicture`);
  }

  public getProfilePictureUrl(id: string): string {
    return `${this.apiService.baseUrl}${this.baseUrl}/${id}/profilepicture`;
  }

  public uploadProfilePicture(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.apiService.postFormData(`${this.baseUrl}/${id}/profilepicture`, formData);
  }

  public searchPerson(query: string): Observable<ReducedPersonDto[]> {
    return this.apollo
      .watchQuery<any>({
        query: gql`query Persons(
          $skip: Int = 0,
          $take: Int = 20,
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
