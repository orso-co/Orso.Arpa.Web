export interface BankAccountModifyBodyDto {
  iban: string;
  bic?: string;
  commentInner?: string;
  statusId?: string;
  accountOwner?: string;
}
