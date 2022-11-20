import { MusicianProfileInquiryStatus } from './musicianProfileInquiryStatus';
import { DoublingInstrumentCreateBodyDto } from './doublingInstrumentCreateBodyDto';

export interface MusicianProfileCreateBodyDto {
  levelAssessmentInner?: number;
  levelAssessmentTeam?: number;
  instrumentId: string;
  qualificationId: string;
  inquiryStatusInner?: MusicianProfileInquiryStatus;
  inquiryStatusTeam?: MusicianProfileInquiryStatus;
  doublingInstruments: Array<DoublingInstrumentCreateBodyDto>;
  preferredPositionsInnerIds: Array<string>;
  preferredPositionsTeamIds: Array<string>;
  preferredPartsInner: Array<number>;
  preferredPartsTeam: Array<number>;
}
