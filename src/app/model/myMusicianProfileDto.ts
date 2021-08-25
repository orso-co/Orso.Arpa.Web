import { CurriculumVitaeReferenceDto } from './curriculumVitaeReferenceDto';
import { EducationDto } from './educationDto';
import { MusicianProfileDeactivationDto } from './musicianProfileDeactivationDto';
import { MyDoublingInstrumentDto } from './myDoublingInstrumentDto';

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
  instrumentId?: string;
  inquiryStatusInnerId?: string;
  doublingInstruments?: Array<MyDoublingInstrumentDto>;
  educations?: Array<EducationDto>;
  curriculumVitaeReferences?: Array<CurriculumVitaeReferenceDto>;
  preferredPositionsInnerIds?: Array<string>;
  preferredPartsInner?: Array<number>;
  documents?: Array<string>;
  deactivation?: MusicianProfileDeactivationDto;
}
