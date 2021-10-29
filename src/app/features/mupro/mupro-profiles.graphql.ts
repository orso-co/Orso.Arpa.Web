import { gql } from 'apollo-angular';

export const MuproProfilesQuery = gql`
  query Projects($skip: Int, $take: Int, $order: SortEnumType = ASC, $searchQuery: String = "") {
    musicianProfiles(
      skip: $skip
      take: $take
      where: {
        isMainProfile: {equals: true}
        and: {
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
      }
    }
  }`;
