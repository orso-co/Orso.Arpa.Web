import { ProjectParticipationStatusInner } from './projectParticipationStatusInner';
export interface MyProjectParticipationModifyBodyDto {
  participationStatusInner: ProjectParticipationStatusInner;
  comment?: string;
  musicianProfileId: string;
}
