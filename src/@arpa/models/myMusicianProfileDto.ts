import { MusicianProfileInquiryStatus } from './musicianProfileInquiryStatus';
import { CurriculumVitaeReferenceDto } from './curriculumVitaeReferenceDto';
import { EducationDto } from './educationDto';
import { MusicianProfileDeactivationDto } from './musicianProfileDeactivationDto';
import { MyDoublingInstrumentDto } from './myDoublingInstrumentDto';
import { RegionPreferenceDto } from './regionPreferenceDto';
import { SectionDto } from './sectionDto';

export interface MyMusicianProfileDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  isMainProfile?: boolean;
  levelAssessmentInner?: number;
  profilePreferenceInner?: number;
  backgroundInner?: string;
  personId?: string;
  instrument?: SectionDto;
  inquiryStatusInner?: MusicianProfileInquiryStatus;
  doublingInstruments?: Array<MyDoublingInstrumentDto>;
  educations?: Array<EducationDto>;
  curriculumVitaeReferences?: Array<CurriculumVitaeReferenceDto>;
  preferredPositionsInnerIds?: Array<string>;
  preferredPartsInner?: Array<number>;
  documents?: Array<string>;
  deactivation?: MusicianProfileDeactivationDto;
  regionPreferencesRehearsal?: Array<RegionPreferenceDto>;
  regionPreferencesPerformance?: Array<RegionPreferenceDto>;
}
