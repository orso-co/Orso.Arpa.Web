import { BankAccountModifyBodyDto } from './bankAccountModifyBodyDto';

export interface BankAccountModifyDto {
  id: string;
  body: BankAccountModifyBodyDto;
  bankAccountId: string;
}
