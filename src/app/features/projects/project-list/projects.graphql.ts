import { gql } from 'apollo-angular';

export const ProjectsQuery = gql`
  query Projects(
    $skip: Int
    $take: Int
    $orderTitle: SortEnumType = ASC
    $orderStartDate: SortEnumType = ASC
    $orderEndDate: SortEnumType = ASC
    $orderGenreId: SortEnumType = ASC
    $orderStateId: SortEnumType = ASC
    $searchQuery: String = ""
  ) {
    projects(
      skip: $skip
      take: $take
      order: {
        title: $orderTitle,
        startDate: $orderStartDate,
        endDate: $orderEndDate,
        genre: {
          selectValue: {
            name: $orderGenreId
          },
        },
        state: {
          selectValue: {
            name: $orderStateId
          },
        },
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
        stateId
        isCompleted
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
        state {
          selectValue {
            name
          }
        }
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
