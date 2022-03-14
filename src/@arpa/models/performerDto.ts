import { AddressDto } from './addressDto';
import { ContactDetailDto } from './contactDetailDto';
import { ReducedPersonDto } from './reducedPersonDto';
import { SectionDto } from './sectionDto';
import { SelectValueDto } from './selectValueDto';
import { MusicianProfileDto } from './musicianProfileDto';
import { DoublingInstrumentDto } from './doublingInstrumentDto';

export interface PerformerDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  givenName?: string;
  surname?: string;
  aboutMe?: string;
  contactVia?: ReducedPersonDto;
  contactsRecommended?: Array<ReducedPersonDto>;
  contactDetails?: Array<ContactDetailDto>;
  gender?: SelectValueDto;
  birthName?: string;
  dateOfBirth?: Date;
  birthplace?: string;
  experienceLevel?: number;
  reliability?: number;
  generalPreference?: number;
  addresses?: Array<AddressDto>;
  stakeholderGroups?: Array<SectionDto>;
  musicianProfiles?: Array<MusicianProfileDto>;
  instrument?: SelectValueDto;
  qualification?: SelectValueDto;
}
