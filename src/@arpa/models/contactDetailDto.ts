import { ContactDetailKey } from './contactDetailKey';
import { SelectValueDto } from './selectValueDto';

export interface ContactDetailDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  key?: ContactDetailKey;
  value?: string;
  type?: SelectValueDto;
  commentInner?: string;
  commentTeam?: string;
  preference?: number;
}
