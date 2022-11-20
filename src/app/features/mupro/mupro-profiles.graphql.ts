import { gql } from 'apollo-angular';

export const MuproProfilesQuery = gql`
  query Profiles($skip: Int, $take: Int, $order: SortEnumType = ASC, $searchQuery: String = "") {
    musicianProfiles(
      skip: $skip
      take: $take
      where: {
        or: [
          {
            person : {
              givenName: {
                contains: $searchQuery
              }
            }
          }
          {
            person : {
              surname: {
                contains: $searchQuery
              }
            }
          }
          {
            instrument : {
              name: {
                contains: $searchQuery
              }
            }
          }
        ]
      }
      order: {person: {givenName: $order, surname: $order}}
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
      items {
        id
        createdAt
        isMainProfile
        person {
          id
          givenName
          surname
          addresses {
            country
            zip
          }

        }
        instrument {
          id
          name
        }
        regionPreferences {
          id
          region {
            id
            name
          }
        }
        projectParticipations {
          id
          project {
            id
            title
          }
          participationStatusInner
          participationStatusInternal
          invitationStatus
        }
      }
    }
  }`;
