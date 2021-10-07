import { gql } from 'apollo-angular';

export const PersonsQuery = gql`
  query Persons(
    $skip: Int,
    $take: Int,
    $orderName: SortEnumType = DESC
    $orderSurname: SortEnumType = DESC
    $orderAboutMe: SortEnumType = DESC
  ){
    persons(
      skip: $skip,
      take: $take,
      order: {
        givenName: $orderName
        surname: $orderSurname
        aboutMe: $orderAboutMe
      }
    ) {
      pageInfo {
        hasNextPage,
        hasPreviousPage
      }

      totalCount

      items {
        givenName
        surname
        aboutMe
      }
    }
  }`;
