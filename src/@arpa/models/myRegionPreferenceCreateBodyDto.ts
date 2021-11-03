import { RegionPreferenceType } from './regionPreferenceType';

export interface MyRegionPreferenceCreateBodyDto {
  rating?: number;
  regionId: string;
  comment?: string;
  type: RegionPreferenceType;
}
