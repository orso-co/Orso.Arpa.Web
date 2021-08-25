export interface CurriculumVitaeReferenceDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  timeSpan?: string;
  institution?: string;
  typeId?: string;
  description?: string;
  sortOrder?: number;
}
