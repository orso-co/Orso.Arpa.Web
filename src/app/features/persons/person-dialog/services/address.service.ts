import { Injectable } from '@angular/core';
import { ApiService } from '@arpa/services';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AddressCreateBodyDto, AddressDto, AddressModifyBodyDto } from '@arpa/models';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService, private apollo: Apollo) {
    this.baseUrl = '/persons';
  }

  addAddress(personId: string, dto: AddressCreateBodyDto): Observable<AddressDto> {
    return this.apiService.post<AddressDto>(`${this.baseUrl}/${personId}/addresses`, dto).pipe(shareReplay());
  }

  updateAddress(personId: string, id: string, dto: AddressModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${personId}/addresses/${id}`, dto).pipe(shareReplay());
  }

  deleteAddress(id: string, personId: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${personId}/addresses/${id}`).pipe(shareReplay());
  }
}
