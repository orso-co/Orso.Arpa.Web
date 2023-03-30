import { ReducedMusicianProfileDto } from './reducedMusicianProfileDto';
import { ProjectDto } from './projectDto';
import { ProjectParticipationStatusInner } from './projectParticipationStatusInner';
import { ProjectParticipationStatusInternal } from './projectParticipationStatusInternal';
import { ProjectParticipationStatusResult } from './projectParticipationStatusResult';
import { MyAppointmentListDto } from './myAppointmentListDto';

export interface MyProjectDto {
  project: ProjectDto;
  participations: MyProjectParticipationDto[];
  appointments: MyAppointmentListDto[];
}

export interface MyProjectParticipationDto {
  participationStatusInner?: ProjectParticipationStatusInner;
  participationStatusInternal?: ProjectParticipationStatusInternal;
  participationStatusResult?: ProjectParticipationStatusResult;
  commentByPerformerInner?: string;
  commentByStaffInner?: string;
  musicianProfile: ReducedMusicianProfileDto;
  myAppointments: MyAppointmentListDto;
}
