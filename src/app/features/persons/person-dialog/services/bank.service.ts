import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@arpa/services';
import { shareReplay } from 'rxjs/operators';
import { BankAccountCreateBodyDto, BankAccountDto, BankAccountModifyBodyDto } from '@arpa/models';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/persons';
  }
  addBankAccount(personId: string, dto: BankAccountCreateBodyDto): Observable<BankAccountDto> {
    return this.apiService.post<BankAccountDto>(`${this.baseUrl}/${personId}/bankaccounts`, dto).pipe(shareReplay());
  }

  updateBankAccount(personId: string, id: string, dto: BankAccountModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${personId}/bankaccounts/${id}`, dto).pipe(shareReplay());
  }

  deleteBankAccount(id: string, personId: any): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${personId}/bankaccounts/${id}`).pipe(shareReplay());
  }
}
