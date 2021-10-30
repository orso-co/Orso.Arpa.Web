export interface UserRegisterDto {
  userName: string;
  password: string;
  email: string;
  givenName: string;
  surname: string;
  genderId: string;
  dateOfBirth?: Date;
  clientUri: string;
  stakeholderGroupIds: Array<string>;
}
