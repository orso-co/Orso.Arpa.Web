import { BaseDto } from './baseDto';
import { SelectValueDto } from './selectValueDto';

export interface RoomDto extends BaseDto {
  building?: string;
  floor?: string;
  name: string;
  ceilingHeight?: CeilingHeight;
  capacity?: SelectValueDto;
  availableEquipment: RoomEquipmentDto[];
  availableInstruments: RoomEquipmentDto[];
  sizeInSquareMeters?: number;
}

export enum CeilingHeight {
  LOW = 'LOW',
  MEDIUM_HIGH = 'MEDIUM_HIGH',
  HIGH = 'HIGH',
}

export interface RoomEquipmentDto {
  id: string;
  name: string;
  quantity?: number;
  description?: string;
}

export interface RoomSectionDto {
  id: string;
  name: string;
  quantity?: number;
  description?: string;
}

export interface RoomCreateBodyDto {
  name: string;
  building?: string;
  floor?: string;
  ceilingHeight?: CeilingHeight;
  capacityId?: string;
  sizeInSquareMeters?: number;
}

export interface RoomModifyBodyDto {
  name: string;
  building?: string;
  floor?: string;
  ceilingHeight?: CeilingHeight;
  capacityId?: string;
  sizeInSquareMeters?: number;
}

export interface RoomEquipmentCreateBodyDto {
  equimpentId: string;
  quantity?: number;
  description?: string;
}

export interface RoomEquipmentModifyBodyDto {
  quantity?: number;
  description?: string;
}

export interface RoomSectionCreateBodyDto {
  instrumentId: string;
  quantity?: number;
  description?: string;
}

export interface RoomSectionModifyBodyDto {
  quantity?: number;
  description?: string;
}
