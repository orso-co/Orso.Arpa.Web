
export interface IBaseEntityDto {
  id: string;
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date | null;
}
