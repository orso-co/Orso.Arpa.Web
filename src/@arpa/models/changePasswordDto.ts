import { ModelObject } from './modelObject';

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: ModelObject;
}
