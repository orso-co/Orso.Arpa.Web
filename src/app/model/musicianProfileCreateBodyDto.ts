import { DoublingInstrumentCreateBodyDto } from './doublingInstrumentCreateBodyDto';

export interface MusicianProfileCreateBodyDto {
    levelAssessmentInner?: number;
    levelAssessmentTeam?: number;
    instrumentId: string;
    qualificationId: string;
    inquiryStatusInnerId?: string;
    inquiryStatusTeamId?: string;
    doublingInstruments?: Array<DoublingInstrumentCreateBodyDto>;
    preferredPositionsInnerIds: Array<string>;
    preferredPositionsTeamIds: Array<string>;
    preferredPartsInner?: Array<number>;
    preferredPartsTeam?: Array<number>;
}
