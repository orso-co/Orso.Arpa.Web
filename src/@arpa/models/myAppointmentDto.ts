import { ProjectDto } from './projectDto';
import { RoomDto } from './roomDto';
import { VenueDto } from './venueDto';

export interface MyAppointmentDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  startTime?: Date;
  endTime?: Date;
  name?: string;
  projects?: Array<ProjectDto>;
  venue?: VenueDto;
  rooms?: Array<RoomDto>;
  publicDetails?: string;
  expectation?: string;
  result?: string;
  predictionId?: string;
}
