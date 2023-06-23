export interface NewsDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  title: string;
  content: string;
  url?: string;
  show?: boolean;
}
