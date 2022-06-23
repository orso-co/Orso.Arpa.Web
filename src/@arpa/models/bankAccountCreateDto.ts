export interface BankAccountCreateDto {
  id: string;
  statusId: string;
  commentInner: string;
  accountOwner: string;
  iban: string;
  bic: string;
}
