import { IBaseEntityDto } from "./IBaseEntityDto";


export interface IProjectDto extends IBaseEntityDto {
  code: number;
  title: string;
  shortTitle: string;
  description: string;
  typeId: string;
  genreId: string;
  startDate: Date;
  endDate: Date;
  urls: string[];
  stateId: string;
  parentId: number;
  isCompleted: boolean;
}
