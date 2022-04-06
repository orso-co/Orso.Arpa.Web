import { ContactDetailCreateBodyDto } from './contactDetailCreateBodyDto';

export interface ContactDetailCreateDto {
  id: string;
  key: string;
  value: string;
  typeId: string;
  commentInner: string;
  preference: number;
  // body: ContactDetailCreateBodyDto;
}
