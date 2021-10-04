export interface AppointmentCreateDto {
  categoryId?: string;
  startTime: Date;
  endTime: Date;
  name: string;
  publicDetails?: string;
  internalDetails?: string;
  statusId?: string;
  salaryId?: string;
  salaryPatternId?: string;
  expectationId?: string;
}
