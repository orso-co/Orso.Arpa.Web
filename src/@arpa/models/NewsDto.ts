export interface NewsDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  newsText: string;
  url?: string;
  show?: boolean;
}
