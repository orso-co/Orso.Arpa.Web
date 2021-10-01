import { AppointmentParticipationDto } from './appointmentParticipationDto';
import { PersonDto } from './personDto';
import { ReducedMusicianProfileDto } from './reducedMusicianProfileDto';

export interface AppointmentParticipationListItemDto {
  person?: PersonDto;
  participation?: AppointmentParticipationDto;
  musicianProfiles?: Array<ReducedMusicianProfileDto>;
}
