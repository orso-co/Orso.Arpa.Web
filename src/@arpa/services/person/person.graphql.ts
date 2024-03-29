import { gql } from 'apollo-angular';

export const PersonQuery = gql`
  query Person($id: UUID) {
    persons(where: { id: { equals: $id } }) {
      items {
        id
        givenName
        surname
        birthName
        dateOfBirth
        birthplace
        aboutMe
        contactVia {
          id
          givenName
          surname
          displayName
        }
        personBackgroundTeam
        reliability
        generalPreference
        experienceLevel
        createdAt
        createdBy
        modifiedAt
        modifiedBy
        gender {
          id
          selectValue {
            name
          }
        }
        musicianProfiles {
          id
          isMainProfile
          backgroundTeam
          levelAssessmentInner
          levelAssessmentTeam

          qualification {
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
            selectValue {
              name
            }
          }
          commentInner
          commentTeam
          preference
        }
        addresses {
          id
          address1
          address2
          city
          zip
          country
          state
          urbanDistrict
          type {
            id
            selectValue {
              name
            }
          }
          commentInner
        }

        bankAccounts {
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

        user {
          userName
          email
        }
      }
    }
  }
`;
