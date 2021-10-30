import { ContactDetailKey } from './contactDetailKey';

export interface MyContactDetailCreateDto {
  key: ContactDetailKey;
  value: string;
  typeId?: string;
  commentInner?: string;
  preference?: number;
}
