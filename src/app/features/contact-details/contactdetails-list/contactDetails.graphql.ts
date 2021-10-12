import { gql } from 'apollo-angular';

export const ContactDetailsQuery = gql`
  query Persons(
    $skip: Int,
    $take: Int,
    $orderName: SortEnumType = ASC
    $orderSurname: SortEnumType = ASC
    $orderAboutMe: SortEnumType = ASC
  ){
    persons(
      skip: $skip,
      take: $take,
      order: {
        surname: $orderSurname
        givenName: $orderName
        aboutMe: $orderAboutMe
      }
    ) {
      pageInfo {
        hasNextPage,
        hasPreviousPage
      }
      totalCount
      items {
        contactDetails{
          key
          value
          commentTeam
          commentInner
          preference
          typeId
          createdAt
          createdBy
          modifiedAt
          modifiedBy
      }
      }
    }
  }`;
