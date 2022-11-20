import { MusicianProfileInquiryStatus } from './musicianProfileInquiryStatus';
import { MyDoublingInstrumentCreateBodyDto } from './myDoublingInstrumentCreateBodyDto';

export interface MyMusicianProfileCreateDto {
  levelAssessmentInner?: number;
  instrumentId: string;
  inquiryStatusInner?: MusicianProfileInquiryStatus;
  doublingInstruments: Array<MyDoublingInstrumentCreateBodyDto>;
  preferredPositionsInnerIds: Array<string>;
  preferredPartsInner: Array<number>;
}
