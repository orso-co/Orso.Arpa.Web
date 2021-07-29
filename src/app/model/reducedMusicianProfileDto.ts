import { MusicianProfileDeactivationDto } from './musicianProfileDeactivationDto';

export interface ReducedMusicianProfileDto {
    id?: string;
    instrumentName?: string;
    qualification?: string;
    doublingInstrumentNames?: string;
    deactivation?: MusicianProfileDeactivationDto;
}
