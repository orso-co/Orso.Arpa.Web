import { AppointmentStatus } from './appointmentStatus';
export interface AppointmentModifyBodyDto {
  categoryId?: string;
  startTime: Date;
  endTime: Date;
  name: string;
  publicDetails?: string;
  internalDetails?: string;
  status?: AppointmentStatus;
  salaryId?: string;
  salaryPatternId?: string;
  expectationId?: string;
}
