import { AddressModifyBodyDto } from './addressModifyBodyDto';

export interface AddressModifyDto {
  id: string;
  body: AddressModifyBodyDto;
  addressId: string;
}
