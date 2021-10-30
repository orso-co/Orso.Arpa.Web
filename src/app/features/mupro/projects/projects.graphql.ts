import { gql } from 'apollo-angular';

export const ProjectsQuery = gql`
  query Projects(
    $skip: Int,
    $take: Int,
    $orderTitle: SortEnumType = ASC
    $personId: UUID
    $searchQuery: String = ""
  ){
    projects(
      skip: $skip,
      take: $take,
      order: {
        title: $orderTitle
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
        stateId
        genre {
          selectValue {name}
        }
        projectParticipations {
          participationStatusInner {
            selectValue {
              name
            }
          }
          participationStatusInternal {
            selectValue {
              name
            }
          }
          commentByPerformerInner
          commentByStaffInner
          commentTeam
          musicianProfile {
            isMainProfile
            instrument {
              name
            }
          }
        }
      }
    }
  }`;
