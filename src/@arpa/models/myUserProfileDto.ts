import { PersonDto } from './personDto';

export interface MyUserProfileDto {
  userName: string;
  email: string;
  person: PersonDto;
}
