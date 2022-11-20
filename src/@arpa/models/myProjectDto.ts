import { ReducedMusicianProfileDto } from './reducedMusicianProfileDto';
import { ProjectDto } from './projectDto';
import { ProjectParticipationStatusInner } from './projectParticipationStatusInner';
import { ProjectParticipationStatusInternal } from './projectParticipationStatusInternal';

export interface MyProjectDto {
  project: ProjectDto;
  participations: MyProjectParticipationDto[];
}

export interface MyProjectParticipationDto {
  participationStatusInner?: ProjectParticipationStatusInner;
  participationStatusInternal?: ProjectParticipationStatusInternal;
  commentByPerformerInner?: string;
  commentByStaffInner?: string;
  musicianProfile: ReducedMusicianProfileDto;
}
