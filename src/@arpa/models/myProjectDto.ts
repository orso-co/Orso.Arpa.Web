import { ProjectDto } from './projectDto';
import { RoomDto } from './roomDto';
import { VenueDto } from './venueDto';
import { ProjectParticipationDto } from './projectParticipationDto';

export interface MyProjectDto {
  id?: string;
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
  projectParticipation?: Array <ProjectParticipationDto>;

}
