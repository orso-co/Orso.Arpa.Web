import { MusicianProfileDeactivationDto } from './musicianProfileDeactivationDto';
import { PersonDto } from './personDto';

export interface ReducedMusicianProfileDto {
  id?: string;
  instrumentName?: string;
  instrument?: any;
  qualification?: string;
  doublingInstrumentNames?: string[];
  deactivation?: MusicianProfileDeactivationDto;
  person?: PersonDto;
}
