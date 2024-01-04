import { ProjectStatus } from './projectStatus';
export interface ProjectModifyBodyDto {
  title: string;
  shortTitle: string;
  description?: string;
  code: string;
  typeId?: string;
  genreId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: ProjectStatus;
  parentId?: string;
  isCompleted: boolean;
  isHiddenToPerformers: boolean;
}
