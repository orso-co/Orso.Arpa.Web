import { AppointmentParticipationPrediction } from './appointmentParticipationPrediction';
import { AppointmentParticipationResult } from './appointmentParticipationResult';
export interface AppointmentParticipationDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  result?: AppointmentParticipationResult;
  prediction?: AppointmentParticipationPrediction;
  commentByPerformerInner?: string;
}
