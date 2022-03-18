import { gql } from 'apollo-angular';

export const PersonsQuery = gql`
  query Persons(
    $skip: Int,
    $take: Int,
    $orderSurname: SortEnumType = ASC,
    $orderGivenName: SortEnumType = ASC,
    $orderAboutMe: SortEnumType = ASC,
    $orderReliability: SortEnumType = ASC,
    $orderGeneralPreference: SortEnumType = ASC,
    $orderExperienceLevel: SortEnumType = ASC,
    $orderCreatedAt: SortEnumType = ASC,
    $orderCreatedBy: SortEnumType = ASC,
    $orderModifiedAt: SortEnumType = ASC,
    $orderModifiedBy: SortEnumType = ASC,
    $searchQuery: String = ""
  ){
    persons(
      skip: $skip,
      take: $take,
      order: {
        surname: $orderSurname,
        givenName: $orderGivenName,
        aboutMe: $orderAboutMe,
        reliability: $orderReliability,
        generalPreference: $orderGeneralPreference,
        experienceLevel: $orderExperienceLevel,
        createdAt: $orderCreatedAt,
        createdBy: $orderCreatedBy,
        modifiedAt: $orderModifiedAt,
        modifiedBy: $orderModifiedBy,
      },
      where: {
        or: [
          { givenName: { contains:$searchQuery}}
          { surname: { contains:$searchQuery}}
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
