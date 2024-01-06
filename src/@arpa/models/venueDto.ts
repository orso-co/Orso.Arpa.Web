import { AddressDto } from './addressDto';
import { BaseDto } from './baseDto';
import { RoomDto } from './roomDto';

export interface VenueDto extends BaseDto {
  name?: string;
  description?: string;
  addressId?: string;
  address?: AddressDto;
  rooms: Array<RoomDto>;
}
