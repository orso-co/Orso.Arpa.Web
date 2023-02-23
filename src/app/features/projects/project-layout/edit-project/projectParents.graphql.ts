import { gql } from 'apollo-angular';

export const ParentProjectsQuery = gql`
  query Projects(
    $orderTitle: SortEnumType = DESC,
    $orderShortTitle: SortEnumType = DESC,
    $searchQuery: String = "") {
    projects(
      order: {title: $orderTitle, shortTitle: $orderShortTitle}
      where:{
        or: [{
          title: {
            contains: $searchQuery
          }
        },{
          shortTitle: {
            contains: $searchQuery
          }
        }]
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
        shortTitle
      }
    }
  }`;
