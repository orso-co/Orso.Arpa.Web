import { ReducedMusicianProfileDto } from './reducedMusicianProfileDto';
import { ReducedPersonDto } from './reducedPersonDto';
import { ReducedProjectDto } from './reducedProjectDto';

export interface ProjectParticipationDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  participationStatusInnerId?: string;
  participationStatusInner?: any;
  participationStatusInternalId?: string;
  participationStatusInternal?: string;
  invitationStatusId?: string;
  invitationStatus?: string;
  commentByPerformerInner?: string;
  commentByStaffInner?: string;
  commentTeam?: string;
  musicianProfile?: ReducedMusicianProfileDto;
  project?: ReducedProjectDto;
  person?: ReducedPersonDto;
}
