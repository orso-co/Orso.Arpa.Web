import { AppointmentStatus } from './appointmentStatus';

export interface AppointmentListDto {
  id: string;
  startTime: Date;
  endTime: Date;
  name: string;
  city?: string;
  status?: AppointmentStatus;
  category?: string;
}
