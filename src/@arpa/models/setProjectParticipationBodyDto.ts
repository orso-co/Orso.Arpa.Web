import { ProjectInvitationStatus } from './projectInvitationStatus';
import { ProjectParticipationStatusInternal } from './projectParticipationStatusInternal';
import { ProjectParticipationStatusInner } from './projectParticipationStatusInner';
export interface SetProjectParticipationBodyDto {
  participationStatusInner?: ProjectParticipationStatusInner;
  participationStatusInternal: ProjectParticipationStatusInternal;
  invitationStatus: ProjectInvitationStatus;
  commentByStaffInner?: string;
  commentTeam?: string;
  musicianProfileId: string;
}
