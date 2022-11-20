import { MusicianProfileInquiryStatus } from './musicianProfileInquiryStatus';
export interface MusicianProfileModifyBodyDto {
  isMainProfile?: boolean;
  levelAssessmentInner?: number;
  levelAssessmentTeam?: number;
  profilePreferenceInner?: number;
  profilePreferenceTeam?: number;
  backgroundInner?: string;
  backgroundTeam?: string;
  salaryComment?: string;
  qualificationId: string;
  salaryId?: string;
  inquiryStatusInner?: MusicianProfileInquiryStatus;
  inquiryStatusTeam?: MusicianProfileInquiryStatus;
  preferredPositionsInnerIds: Array<string>;
  preferredPositionsTeamIds: Array<string>;
  preferredPartsInner: Array<number>;
  preferredPartsTeam: Array<number>;
}
