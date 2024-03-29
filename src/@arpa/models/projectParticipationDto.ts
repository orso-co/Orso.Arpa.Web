import { ProjectParticipationStatusInternal } from './projectParticipationStatusInternal';
import { ProjectParticipationStatusInner } from './projectParticipationStatusInner';
import { ProjectInvitationStatus } from './projectInvitationStatus';
import { ReducedMusicianProfileDto } from './reducedMusicianProfileDto';
import { ReducedPersonDto } from './reducedPersonDto';
import { ReducedProjectDto } from './reducedProjectDto';
import { ProjectParticipationStatusResult } from './projectParticipationStatusResult';

export interface ProjectParticipationDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  participationStatusInner?: ProjectParticipationStatusInner;
  participationStatusInternal?: ProjectParticipationStatusInternal;
  participationStatusResult?: ProjectParticipationStatusResult;
  invitationStatus?: ProjectInvitationStatus;
  commentByPerformerInner?: string;
  commentByStaffInner?: string;
  commentTeam?: string;
  musicianProfile?: ReducedMusicianProfileDto;
  project?: ReducedProjectDto;
  parentProject?: ReducedProjectDto;
  person?: ReducedPersonDto;
  children?: ReducedProjectDto[];
}
