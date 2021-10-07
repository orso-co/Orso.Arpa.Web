import { gql } from 'apollo-angular';

export const ProjectsQuery = gql`
  query Projects(
    $skip: Int,
    $take: Int,
    $orderTitle: SortEnumType = DESC
    $orderStart: SortEnumType = DESC
    $orderEnd: SortEnumType = DESC
  ){
    projects(
      skip: $skip,
      take: $take,
      order: {
        title: $orderTitle
        startDate: $orderStart
        endDate: $orderEnd
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
        startDate
        endDate
        stateId
        isCompleted
      }
    }

  }`;
