import { ProjectStatus } from './projectStatus';
import { SelectValueDto } from './selectValueDto';
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
  type?: SelectValueDto;
  genre?: SelectValueDto;
  startDate?: Date;
  endDate?: Date;
  urls?: Array<UrlDto>;
  status?: ProjectStatus;
  parentId?: string;
  isCompleted?: boolean;
}
