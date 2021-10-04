export interface MyMusicianProfileModifyBodyDto {
  isMainProfile?: boolean;
  levelAssessmentInner?: number;
  profilePreferenceInner?: number;
  backgroundInner?: string;
  inquiryStatusInnerId?: string;
  preferredPositionsInnerIds: Array<string>;
  preferredPartsInner?: Array<number>;
}
