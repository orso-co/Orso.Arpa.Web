import { gql } from 'apollo-angular';

export const PersonsQuery = gql`
  query Persons(
    $skip: Int,
    $take: Int,
    $orderName: SortEnumType = ASC
    $orderSurname: SortEnumType = ASC
    $orderAboutMe: SortEnumType = ASC
    $searchQuery: String = ""
  ){
    persons(
      skip: $skip,
      take: $take,
      order: {
        surname: $orderSurname
        givenName: $orderName
        aboutMe: $orderAboutMe
      }
      where: {
        or: [
          { surname: { contains:$searchQuery}}
          { givenName: { contains:$searchQuery}}
        ]
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
        reliability
        generalPreference
        experienceLevel
        createdAt
        createdBy
        modifiedAt
        modifiedBy
      }
    }
  }`;
