import { AppointmentListDto } from './appointmentListDto';
import { AppointmentParticipationDto } from './appointmentParticipationDto';

export interface MusicianProfileAppointmentParticipationDto {
  appointmentParticipation: AppointmentParticipationDto;
  appointment: AppointmentListDto;
}
