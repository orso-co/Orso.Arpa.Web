import { AppointmentStatus } from './appointmentStatus';
import { SectionsAllDto } from './sectionsAllDto';
export interface AppointmentListDto {
  id: string;
  startTime: Date;
  endTime: Date;
  name: string;
  city?: string;
  status?: AppointmentStatus;
  sections: Array<SectionsAllDto>;
}
