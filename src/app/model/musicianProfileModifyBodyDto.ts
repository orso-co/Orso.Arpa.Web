
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
    inquiryStatusInnerId?: string;
    inquiryStatusTeamId?: string;
    preferredPositionsInnerIds: Array<string>;
    preferredPositionsTeamIds: Array<string>;
    preferredPartsInner?: Array<number>;
    preferredPartsTeam?: Array<number>;
}
