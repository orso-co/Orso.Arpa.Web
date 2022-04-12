export interface PersonInviteResultDto {
  successfulInvites: { [key: string]: string };
  personsWithoutEmailAddress: string[];
  personsAlreadyRegistered: string[];
  personsWithMultipleEmailAddresses: { [key: string]: string[] };
  failedInvites: { [key: string]: string };
}
