export interface PersonCreateDto {
  givenName: string;
  surname: string;
  aboutMe: string;
  genderId: string;
  contactViaId?: string;
  dateOfBirth?: Date;
  birthplace?: string;
  experienceLevel?: number;
  birthName?: string;
  reliability?: number;
  generalPreference?: number;
}
