import { gql } from 'apollo-angular';

export const PerformersQuery = gql`
  query MusicianProfiles(
    $skip: Int,
    $take: Int,
    $orderLevelAssessmentTeam: SortEnumType = ASC,
    $searchQuery: String = ""
  ){
    musicianProfiles(
      skip: $skip,
      take: $take,
      order: {
        levelAssessmentTeam: $orderLevelAssessmentTeam
      },
      where: { instrument: { name: { contains:$searchQuery}}
        or: [
          { instrument: { name: { contains:$searchQuery} }}
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
        instrumentId
        instrument {
          name

        }

        levelAssessmentTeam
        levelAssessmentInner
        qualificationId
        qualification { selectValue { name }}
        personId

        person {
          id
          givenName
          surname
          reliability
          generalPreference
          experienceLevel
          createdAt
          createdBy
          modifiedAt
          modifiedBy

        }
      }
    }
  }`;
