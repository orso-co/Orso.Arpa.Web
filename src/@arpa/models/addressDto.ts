import { SelectValueDto } from './selectValueDto';

export interface AddressDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  address1?: string;
  address2?: string;
  zip?: string;
  city?: string;
  urbanDistrict?: string;
  country?: string;
  state?: string;
  commentInner?: string;
  type?: SelectValueDto;
}
