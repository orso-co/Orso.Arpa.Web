export interface EducationCreateBodyDto {
  timeSpan: string;
  institution: string;
  typeId?: string;
  description?: string;
  sortOrder?: number;
}
