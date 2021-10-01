import { AddressDto } from './addressDto';
import { RoomDto } from './roomDto';

export interface VenueDto {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  name: string;
  description?: string;
  addressId?: string;
  address?: AddressDto;
  rooms?: Array<RoomDto>;
}
