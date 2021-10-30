import { ContactDetailKey } from './contactDetailKey';

export interface ContactDetailCreateBodyDto {
  key: ContactDetailKey;
  value: string;
  typeId?: string;
  commentTeam?: string;
  preference?: number;
}
