export interface ProjectCreateDto {
  title: string;
  shortTitle: string;
  description?: string;
  code: string;
  typeId?: string;
  genreId?: string;
  startDate?: Date;
  endDate?: Date;
  stateId?: string;
  parentId?: string;
  isCompleted?: boolean;
}
