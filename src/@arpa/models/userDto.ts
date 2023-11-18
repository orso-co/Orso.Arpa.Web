import { SectionDto } from './sectionDto';

export interface UserDto {
  id?: string;
  userName?: string;
  roleNames?: Array<string>;
  displayName?: string;
  email?: string;
  emailConfirmed?: boolean;
  createdAt?: Date;
  stakeholderGroups?: SectionDto[];
  status?: UserStatus;
  personId?: string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  AWAITING_ROLE_ASSIGNMENT = 'AWAITING_ROLE_ASSIGNMENT',
  AWAITING_EMAIL_CONFIRMATION = 'AWAITING_EMAIL_CONFIRMATION',
}
