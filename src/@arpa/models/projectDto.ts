import { UrlDto } from './urlDto';

export interface ProjectDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  title: string;
  shortTitle?: string;
  description?: string;
  code?: string;
  typeId?: string;
  genreId?: string;
  startDate?: Date;
  endDate?: Date;
  urls?: Array<UrlDto>;
  stateId?: string;
  parentId?: string;
  isCompleted?: boolean;
}
