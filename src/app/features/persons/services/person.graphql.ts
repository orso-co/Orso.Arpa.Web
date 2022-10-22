import { gql } from 'apollo-angular';

export const PersonQuery = gql`
  query Person($id: UUID){
    persons(
      where: {id: { equals: $id }}
    )  {
      items
      {
        id
        givenName
        surname
        aboutMe
        reliability
        generalPreference
        experienceLevel
        createdAt
        createdBy
        modifiedAt
        modifiedBy

        musicianProfiles {
          id
          isMainProfile
          backgroundTeam
          levelAssessmentInner
          levelAssessmentTeam

          qualification{
            id
            selectValue {
              name
            }
          }

          deactivation {
            deactivationStart
          }

          instrument {
            id
            name
          }

        }
        contactDetails {
          id
          key
          value
          type {
            id
            selectValue { name }
          }
          commentInner
          commentTeam
          preference


        }

        bankAccounts{
          id
          iban
          bic
          status {
            id
            selectValue {
              name
            }
          }
          commentInner
          accountOwner

        }

      }
    }
  }`;
