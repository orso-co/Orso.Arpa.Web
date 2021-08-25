export interface UserDto {
  id?: string;
  userName?: string;
  roleNames?: Array<string>;
  displayName?: string;
  email?: string;
  emailConfirmed?: boolean;
  createdAt?: Date;
  stakeholderGroupIds?: Array<string>;
}
