import { ReducedMusicianProfileDto } from './reducedMusicianProfileDto';
import { ProjectDto } from './projectDto';
import { ProjectParticipationStatusInner } from './projectParticipationStatusInner';
import { ProjectParticipationStatusInternal } from './projectParticipationStatusInternal';
import { MyAppointmentListDto } from './myAppointmentListDto';

export interface MyProjectDto {
  project: ProjectDto;
  participations: MyProjectParticipationDto[];
  appointments: MyAppointmentListDto[];
  totalRecordsCount: number;
}

export interface MyProjectParticipationDto {
  participationStatusInner?: ProjectParticipationStatusInner;
  participationStatusInternal?: ProjectParticipationStatusInternal;
  commentByPerformerInner?: string;
  commentByStaffInner?: string;
  musicianProfile: ReducedMusicianProfileDto;
  myAppointments: MyAppointmentListDto;
}
