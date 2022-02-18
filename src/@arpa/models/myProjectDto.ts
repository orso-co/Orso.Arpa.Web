import { ReducedMusicianProfileDto } from './reducedMusicianProfileDto';
import { SelectValueDto } from './selectValueDto';
import { ProjectDto } from './projectDto';

export interface MyProjectDto {
  project: ProjectDto;
  participations: MyProjectParticipationDto[];
}

export interface MyProjectParticipationDto {
  participationStatusInner?: SelectValueDto;
  participationStatusInternal?: SelectValueDto;
  commentByPerformerInner?: string;
  commentByStaffInner?: string;
  musicianProfile?: ReducedMusicianProfileDto;
}
