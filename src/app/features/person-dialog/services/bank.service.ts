import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../@arpa/services/api.service';
import { shareReplay } from 'rxjs/operators';
import { BankAccountDto } from 'src/@arpa/models/bankAccountDto';
import { BankAccountCreateDto } from '../../../../@arpa/models/bankAccountCreateDto';
import { BankAccountModifyBodyDto } from '../../../../@arpa/models/bankAccountModifyBodyDto';


@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/persons';
  }
  addBankAccount(personId: string, dto: BankAccountCreateDto): Observable<BankAccountDto> {
    return this.apiService.post<BankAccountDto>(`${this.baseUrl}/${personId}/bankaccounts`, dto).pipe(shareReplay());
  }

  updateBankAccount(id: string,  dto: BankAccountModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/bankaccounts/${id}`, dto).pipe(shareReplay());
  }

  deleteBankAccount(id: string, personId: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${personId}/bankaccounts/${id}`).pipe(shareReplay());
  }
}
