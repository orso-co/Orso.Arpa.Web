import { IBaseEntityDto } from './IBaseEntityDto';
import { IProjectDto } from './IProjectDto';
import { ISectionDto } from './section';

export interface ICalendarEvent {
  id: string;
  allDay: boolean;
  start: Date;
  end: Date;
  title: string;
}

export interface IAppointmentDto extends IBaseEntityDto {
  categoryId: string;
  startTime: string;
  endTime: string;
  name: string;
  publicDetails: string;
  internalDetails: string;
  statusId: string;
  salaryId: string;
  salaryPatternId: string;
  venueId: string;
  rooms: IRoomDto[];
  projects: IProjectDto[];
  sections: ISectionDto[];
  participations: IAppointmentParticipationListItemDto[];
  expectationId: string;
}

export interface IRoomDto extends IBaseEntityDto {
  id: string;
  building: string;
  floor: string;
  name: string;
  venueId: string;
}

export interface IAppointmentParticipationListItemDto {
  participation: IAppointmentParticipationDto;
  person: IPersonDto;
  musicianProfiles: IMusicianProfileDto[];
}

export interface IAppointmentParticipationDto extends IBaseEntityDto {
  resultId: string;
  predictionId: string;
}

export interface IMusicianProfileDto {
  sectionName: string;
  qualification: string;
  instrumentId: string;
}

export interface IPersonDto extends IBaseEntityDto {
  givenName: string;
  surname: string;
}

export interface IVenueDto extends IBaseEntityDto {
  name: string;
  description: string;
  addressId: string;
  address: IAddressDto;
  rooms: IRoomDto[];
}

export interface IAddressDto extends IBaseEntityDto {
  address1: string;
  address2: string;
  zip: string;
  city: string;
  urbanDistrict: string;
  country: string;
  state: string;
  regionId: string;
}

export interface IUserAppointmentListDto {
  userAppointments: IUserAppointmentDto[];
  totalRecordsCount: number;
}

export interface IUserAppointmentDto extends IBaseEntityDto {
  startTime: string;
  endTime: string;
  name: string;
  projects: IProjectDto[];
  venue: IVenueDto;
  rooms: IRoomDto[];
  publicDetails: string;
  expectation: string;
  result: string;
  predictionId: string;
}
