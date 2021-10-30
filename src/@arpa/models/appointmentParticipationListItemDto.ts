import { AppointmentParticipationDto } from './appointmentParticipationDto';
import { ReducedMusicianProfileDto } from './reducedMusicianProfileDto';
import { ReducedPersonDto } from './reducedPersonDto';

export interface AppointmentParticipationListItemDto {
  person?: ReducedPersonDto;
  participation?: AppointmentParticipationDto;
  musicianProfiles?: Array<ReducedMusicianProfileDto>;
}
