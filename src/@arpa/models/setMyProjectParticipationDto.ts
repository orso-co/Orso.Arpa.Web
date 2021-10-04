import { SetMyProjectParticipationBodyDto } from './setMyProjectParticipationBodyDto';

export interface SetMyProjectParticipationDto {
  id: string;
  body: SetMyProjectParticipationBodyDto;
  projectId: string;
}
