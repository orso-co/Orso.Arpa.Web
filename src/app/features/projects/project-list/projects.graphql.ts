import { gql } from 'apollo-angular';

export const ProjectsQuery = gql`
  query Projects(
    $skip: Int,
    $take: Int,
    $orderTitle: SortEnumType = ASC
    $orderStart: SortEnumType = ASC
    $orderEnd: SortEnumType = ASC
    $searchQuery: String = ""
  ){
    projects(
      skip: $skip,
      take: $take,
      order: {
        title: $orderTitle
        startDate: $orderStart
        endDate: $orderEnd
      }
      where: {
        or: [
          { title: { contains:$searchQuery}}
          { code: { contains:$searchQuery}}
          { shortTitle: { contains:$searchQuery}}
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
        startDate
        endDate
        stateId
        isCompleted
        genreId
        typeId
        parentId
        shortTitle
        description
        code
        state {
          selectValue {
            name
          }
        }
        parent {
          title
          id
        }
      }
    }
  }`;
