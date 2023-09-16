import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../../@arpa/services/api.service';
import { shareReplay } from 'rxjs/operators';
import { ContactDetailCreateBodyDto } from 'src/@arpa/models/contactDetailCreateBodyDto';
import { ContactDetailModifyBodyDto } from 'src/@arpa/models/contactDetailModifyBodyDto';
import { ContactDetailDto } from 'src/@arpa/models/contactDetailDto';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/persons';
  }
  addContactDetail(personId: string, dto: ContactDetailCreateBodyDto): Observable<ContactDetailDto> {
    return this.apiService.post<ContactDetailDto>(`${this.baseUrl}/${personId}/contactdetails`, dto).pipe(shareReplay());
  }

  updateContactDetail(personId: string, id: string, dto: ContactDetailModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${personId}/contactdetails/${id}`, dto).pipe(shareReplay());
  }

  deleteContactDetail(id: string, personId: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${personId}/contactdetails/${id}`).pipe(shareReplay());
  }
}
