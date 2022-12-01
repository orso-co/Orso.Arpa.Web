import { ContactDetailKey } from './contactDetailKey';

export interface ContactDetailDto {
  id?: string | undefined;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  key?: ContactDetailKey;
  value?: string;
  typeId?: string;
  commentInner?: string;
  commentTeam?: string;
  preference?: number;
}
