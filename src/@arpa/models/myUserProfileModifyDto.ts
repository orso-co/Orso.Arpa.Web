export interface MyUserProfileModifyDto {
  email: string;
  givenName: string;
  surname: string;
  aboutMe?: string;
  genderId: string;
  dateOfBirth?: Date;
  birthplace?: string;
  birthName?: string;
}
