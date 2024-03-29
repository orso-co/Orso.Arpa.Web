import { AppointmentStatus } from './appointmentStatus';
import { AppointmentParticipationListItemDto } from './appointmentParticipationListItemDto';
import { ProjectDto } from './projectDto';
import { RoomDto } from './roomDto';
import { SectionsAllDto } from './sectionsAllDto';

export interface AppointmentDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
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
  venueId?: string;
  rooms: Array<RoomDto>;
  projects: Array<ProjectDto>;
  sections: Array<SectionsAllDto>;
  participations: Array<AppointmentParticipationListItemDto>;
}
