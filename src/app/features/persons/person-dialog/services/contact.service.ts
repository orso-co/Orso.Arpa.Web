import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../../@arpa/services/api.service';
import { shareReplay } from 'rxjs/operators';
import { ContactDetailCreateDto } from 'src/@arpa/models/contactDetailCreateDto';
import { ContactDetailModifyBodyDto } from 'src/@arpa/models/contactDetailModifyBodyDto';
import { ContactDetailDto } from 'src/@arpa/models/contactDetailDto';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService, private apollo: Apollo) {
    this.baseUrl = '/persons';
  }
  addContactDetail(personId: string, dto: ContactDetailCreateDto): Observable<ContactDetailDto> {
    return this.apiService.post<ContactDetailDto>(`${this.baseUrl}/${personId}/contactdetails`, dto).pipe(shareReplay());
  }

  updateContactDetail(personId: string, id: string, dto: ContactDetailModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${personId}/contactdetails/${id}`, dto).pipe(shareReplay());
  }

  deleteContactDetail(id: string, personId: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${personId}/contactdetails/${id}`).pipe(shareReplay());
  }
}
