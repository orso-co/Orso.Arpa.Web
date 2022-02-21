import { ContactDetailKey } from './contactDetailKey';

export interface ContactDetailCreateBodyDto {
  key: ContactDetailKey;
  value: string;
  typeId?: string;
  commentInner?: string;
  preference?: number;
}
