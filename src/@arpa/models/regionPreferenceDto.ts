import { RegionDto } from './regionDto';

export interface RegionPreferenceDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  region?: RegionDto;
  rating?: number;
  comment?: string;
}
