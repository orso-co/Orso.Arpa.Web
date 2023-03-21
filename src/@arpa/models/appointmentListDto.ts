import { AppointmentStatus } from './appointmentStatus';
import { SectionsAllDto } from './sectionsAllDto';
export interface AppointmentListDto {
  id: string;
  startTime: Date;
  endTime: Date;
  name: string;
  status?: AppointmentStatus;
  sections: Array<SectionsAllDto>;
}
