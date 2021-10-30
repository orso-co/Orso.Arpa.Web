import { MyDoublingInstrumentCreateBodyDto } from './myDoublingInstrumentCreateBodyDto';

export interface MyMusicianProfileCreateDto {
  levelAssessmentInner?: number;
  instrumentId: string;
  inquiryStatusInnerId?: string;
  doublingInstruments: Array<MyDoublingInstrumentCreateBodyDto>;
  preferredPositionsInnerIds: Array<string>;
  preferredPartsInner: Array<number>;
}
