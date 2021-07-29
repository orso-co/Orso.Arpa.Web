import { MyAppointmentDto } from './myAppointmentDto';

export interface MyAppointmentListDto {
    userAppointments?: Array<MyAppointmentDto>;
    totalRecordsCount?: number;
}
