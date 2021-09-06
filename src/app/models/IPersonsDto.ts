import { IBaseEntityDto } from './IBaseEntityDto';

export interface IPersonsDto extends IBaseEntityDto {
  givenName: string;
  surname: string;
  aboutMe: string;

}
