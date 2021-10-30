import { ContactDetailModifyBodyDto } from './contactDetailModifyBodyDto';

export interface ContactDetailModifyDto {
  id: string;
  body: ContactDetailModifyBodyDto;
  contactDetailId: string;
}
