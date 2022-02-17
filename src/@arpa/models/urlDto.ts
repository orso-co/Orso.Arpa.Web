import { RoleDto } from './roleDto';

export interface UrlDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
  href?: string;
  anchorText?: string;
  urlRoles?: Array<UrlRoleDto>;
}

export interface UrlRoleDto {
  id?: string;
  role: RoleDto;
}
