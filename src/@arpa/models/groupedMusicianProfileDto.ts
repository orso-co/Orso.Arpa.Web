import { ReducedMusicianProfileDto } from './reducedMusicianProfileDto';
import { ReducedPersonDto } from './reducedPersonDto';

export interface GroupedMusicianProfileDto {
  person?: ReducedPersonDto;
  musicianProfiles?: Array<ReducedMusicianProfileDto>;
}
