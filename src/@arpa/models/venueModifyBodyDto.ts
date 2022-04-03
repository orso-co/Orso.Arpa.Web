export interface VenueModifyBodyDto {
  name: string;
  description?: string;
  address1?: string;
  address2?: string;
  zip: string;
  city: string;
  urbanDistrict?: string;
  country: string;
  state?: string;
  addressCommentInner?: string;
}
