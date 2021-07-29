import { CurriculumVitaeReferenceDto } from './curriculumVitaeReferenceDto';
import { DoublingInstrumentDto } from './doublingInstrumentDto';
import { EducationDto } from './educationDto';
import { MusicianProfileDeactivationDto } from './musicianProfileDeactivationDto';
import { SelectValueDto } from './selectValueDto';

export interface MusicianProfileDto {
    id?: string;
    createdBy?: string;
    createdAt?: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
    isMainProfile?: boolean;
    levelAssessmentInner: number;
    levelAssessmentTeam?: number;
    profilePreferenceInner?: number;
    profilePreferenceTeam?: number;
    backgroundInner?: string;
    backgroundTeam?: string;
    salaryComment?: string;
    personId: string;
    instrumentId: string;
    qualificationId: string;
    salaryId?: string;
    inquiryStatusInnerId: string;
    inquiryStatusTeamId?: string;
    doublingInstruments?: Array<DoublingInstrumentDto>;
    educations?: Array<EducationDto>;
    curriculumVitaeReferences?: Array<CurriculumVitaeReferenceDto>;
    preferredPositionsInnerIds: Array<string>;
    preferredPositionsTeamIds?: Array<string>;
    preferredPartsInner: Array<number>;
    preferredPartsTeam?: Array<number>;
    documents?: Array<SelectValueDto>;
    deactivation?: MusicianProfileDeactivationDto;
    sectionName: string;
    qualification: string;
}
