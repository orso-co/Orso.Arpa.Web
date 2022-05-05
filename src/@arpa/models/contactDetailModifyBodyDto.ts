import { ContactDetailKey } from './contactDetailKey';

export interface ContactDetailModifyBodyDto {
  key: ContactDetailKey;
  value: string;
  typeId?: string;
  commentTeam?: string;
  commentInner?: string;
  preference?: number;
}
