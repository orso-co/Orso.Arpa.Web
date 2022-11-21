import { ProjectParticipationStatusInner } from './projectParticipationStatusInner';
export interface MyProjectParticipationModifyBodyDto {
  participationStatusInner: ProjectParticipationStatusInner;
  commentByPerformerInner?: string;
  musicianProfileId: string;
}
