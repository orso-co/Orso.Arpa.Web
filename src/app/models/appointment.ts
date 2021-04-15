import { ISectionDto } from './section';

export interface IBaseEntityDto {
  id: string;
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date | null;
}

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
  emolumentId: string;
  emolumentPatternId: string;
  venueId: string;
  rooms: IRoomDto[];
  projects: IProjectDto[];
  sections: ISectionDto[];
  participations: IAppointmentParticipationListItemDto[];
  expectationId: string;
}

export interface ISelectValueDto extends IBaseEntityDto {
  name: string;
  description: string;
}

export interface IRoomDto extends IBaseEntityDto {
  id: string;
  building: string;
  floor: string;
  name: string;
  venueId: string;
}

export interface IProjectDto extends IBaseEntityDto {
  // eslint-disable-next-line id-blacklist
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  typeId: string;
  genreId: string;
  startDate: Date;
  endDate: Date;
  urls: String[];
  stateId: string;
  parentId: number;
  isCompleted: boolean;
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
