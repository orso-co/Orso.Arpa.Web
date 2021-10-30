export interface BankAccountCreateBodyDto {
  iban: string;
  bic?: string;
  commentInner?: string;
  accountOwner?: string;
}
