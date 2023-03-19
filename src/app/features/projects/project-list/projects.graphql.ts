import { gql } from 'apollo-angular';

export const ProjectsQuery = gql`
  query Projects(
    $skip: Int
    $take: Int = 20
    $orderEndDate: SortEnumType = DESC
    $orderGenreId: SortEnumType = ASC
    $orderStatus: SortEnumType = ASC
    $searchQuery: String = ""
  ) {
    projects(
      skip: $skip
      take: $take
      order: {
        endDate: $orderEndDate,
        genre: {
          selectValue: {
            name: $orderGenreId
          },
        },
        status: $orderStatus,
      }
      where: {
        or: [{ title: { contains: $searchQuery } }, { code: { contains: $searchQuery } }, { shortTitle: { contains: $searchQuery } }]
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }

      totalCount

      items {
        id
        title
        startDate
        endDate
        status
        isCompleted
        isHiddenForPerformers
        genreId
        genre {
          selectValue {
            name
          }
        }
        typeId
        parentId
        shortTitle
        description
        code
        parent {
          title
          id
        }
        urls {
          id
          href
          anchorText
          urlRoles {
            id
            role {
              id
              roleName: name
              roleLevel: level
            }
          }
        }
      }
    }
  }
`;
