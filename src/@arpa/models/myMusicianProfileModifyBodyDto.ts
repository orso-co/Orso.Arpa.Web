import { MusicianProfileInquiryStatus } from './musicianProfileInquiryStatus';
export interface MyMusicianProfileModifyBodyDto {
  isMainProfile?: boolean;
  levelAssessmentInner?: number;
  profilePreferenceInner?: number;
  backgroundInner?: string;
  inquiryStatusInner?: MusicianProfileInquiryStatus;
  preferredPositionsInnerIds: Array<string>;
  preferredPartsInner: Array<number>;
}
