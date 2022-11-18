import { AppointmentStatus } from './appointmentStatus';
export interface AppointmentListDto {
  id: string;
  startTime: Date;
  endTime: Date;
  name: string;
  status?: AppointmentStatus;
}
