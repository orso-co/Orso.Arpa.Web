import { IPersonDto } from './appointment';
import { IProjectDto } from './IProjectDto';

export interface IProjectParticipationStatus {
  statusId: string;
  comment?: string;
}

export interface IProjectParticipation {
  musicianProfile: { instrumentName: string };
  project: IProjectDto;
  person: IPersonDto;
}
