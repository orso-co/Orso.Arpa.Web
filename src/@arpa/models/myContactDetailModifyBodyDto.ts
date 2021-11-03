import { ContactDetailKey } from './contactDetailKey';

export interface MyContactDetailModifyBodyDto {
  key: ContactDetailKey;
  value: string;
  typeId?: string;
  commentInner?: string;
  preference?: number;
}
