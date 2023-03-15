import { MyProjectDto } from './myProjectDto';

export interface MyProjectListDto {
  userProjects?: Array<MyProjectDto>;
  totalRecordsCount?: number;
}
