import { AddressDto } from './addressDto';
import { BankAccountDto } from './bankAccountDto';
import { ContactDetailDto } from './contactDetailDto';
import { ReducedPersonDto } from './reducedPersonDto';
import { SectionDto } from './sectionDto';
import { SelectValueDto } from './selectValueDto';
import { MusicianProfileDto } from './musicianProfileDto';
import { UserDto } from './userDto';

export interface PersonDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  givenName?: string;
  surname?: string;
  aboutMe?: string;
  contactVia?: ReducedPersonDto;
  contactsRecommended?: Array<ReducedPersonDto>;
  bankAccounts?: Array<BankAccountDto>;
  contactDetails?: Array<ContactDetailDto>;
  musicianProfiles?: Array<MusicianProfileDto>;
  gender?: SelectValueDto;
  birthName?: string;
  dateOfBirth?: Date;
  birthplace?: string;
  experienceLevel?: number;
  reliability?: number;
  generalPreference?: number;
  addresses?: Array<AddressDto>;
  stakeholderGroups?: Array<SectionDto>;
  user?: UserDto;
}
