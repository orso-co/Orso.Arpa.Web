import { gql } from 'apollo-angular';

export const ProjectsQuery = gql`
  query Projects(
    $skip: Int,
    $take: Int,
    $orderTitle: SortEnumType = ASC
    $personId: UUID
  ){
    projects(
      skip: $skip,
      take: $take,
      order: {
        title: $orderTitle
      }
      where: {
        projectParticipations: {
          some:{
            musicianProfile: {
              personId: {
                equals: $personId
              }
            }
          }
        }
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
      }
    }
  }`;
