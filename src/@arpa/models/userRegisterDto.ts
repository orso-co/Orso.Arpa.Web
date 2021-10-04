export interface UserRegisterDto {
  userName: string;
  password: string;
  email: string;
  givenName: string;
  surname: string;
  genderId: string;
  clientUri: string;
  stakeholderGroupIds?: Array<string>;
}
