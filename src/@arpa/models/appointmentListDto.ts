export interface AppointmentListDto {
  id: string;
  startTime: Date;
  endTime: Date;
  name: string;
  statusId?: string;
}
