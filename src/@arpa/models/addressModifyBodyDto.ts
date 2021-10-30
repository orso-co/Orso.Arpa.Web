export interface AddressModifyBodyDto {
  address1?: string;
  address2?: string;
  zip: string;
  city: string;
  urbanDistrict?: string;
  country: string;
  state?: string;
  commentInner?: string;
  typeId?: string;
}
