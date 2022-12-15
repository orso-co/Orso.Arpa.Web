import { gql } from 'apollo-angular';

export const AppointmentsQuery = gql`
  query Appointments(
    $skip: Int,
    $take: Int,
    $orderTitle: SortEnumType = ASC,
    $orderStartDate: SortEnumType = ASC,
    $orderGenre__selectValue__name: SortEnumType = ASC,
    $personId: UUID
    $searchQuery: String = ""
  ){
    projects(
      skip: $skip,
      take: $take,
      order: {
        title: $orderTitle,
        startDate: $orderStartDate,
        genre: {
          selectValue: {
            name: $orderGenre__selectValue__name,
          },
        },
      }
      where: {
        projectParticipations: {some: {musicianProfile: {personId: {equals: $personId}}}}
        or:[
          { title: { contains:$searchQuery}}
        ]
      }
    ) {
      pageInfo {
        hasNextPage,
        hasPreviousPage
      }

      totalCount

      items {
        id
        title
        id
        startDate
        status
        genre {
          selectValue {name}
        }

        projectParticipations {
          invitationStatus
          participationStatusInner
          participationStatusInternal
          commentByPerformerInner
          commentByStaffInner
          commentTeam


          musicianProfile {
            id
            isMainProfile
            instrument {
              name
            }
            person {
              id
              givenName
              surname
              appointmentParticipations {
                appointment {
                  name
                }
                prediction
                result
              }
            }
          }

        }
      }
    }
  }`;
