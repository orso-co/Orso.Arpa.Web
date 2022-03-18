import { gql } from 'apollo-angular';

export const PerformersQuery = gql`
  query MusicianProfiles(
    $skip: Int,
    $take: Int,
    $orderLevelAssessmentTeam: SortEnumType = ASC,
    $orderLevelAssessmentInner: SortEnumType = ASC,
    $orderInstrument__name: SortEnumType = ASC,
    $orderQualificationId: SortEnumType = ASC,
    $orderPerson__surname: SortEnumType = ASC,
    $orderPerson__givenName: SortEnumType = ASC,
    $orderPerson__reliability: SortEnumType = ASC,
    $orderPerson__generalPreference: SortEnumType = ASC,
    $orderPerson__experienceLevel: SortEnumType = ASC,
    $orderPerson__createdAt: SortEnumType = ASC,
    $orderPerson__createdBy: SortEnumType = ASC,
    $orderPerson__modifiedAt: SortEnumType = ASC,
    $orderPerson__modifiedBy: SortEnumType = ASC,
    $searchQuery: String = ""
  ){
    musicianProfiles(
      skip: $skip,
      take: $take,
      order: {
        levelAssessmentTeam: $orderLevelAssessmentTeam,
        levelAssessmentInner: $orderLevelAssessmentInner,
        instrument: {
          name: $orderInstrument__name,
        },
        qualification: {
          selectValue: {
            name: $orderQualificationId
          }
        },
        person: {
          surname: $orderPerson__surname,
          givenName: $orderPerson__givenName,
          reliability: $orderPerson__reliability,
          generalPreference: $orderPerson__generalPreference,
          experienceLevel: $orderPerson__experienceLevel,
          createdAt: $orderPerson__createdAt,
          createdBy: $orderPerson__createdBy,
          modifiedAt: $orderPerson__modifiedAt,
          modifiedBy: $orderPerson__modifiedBy,
        }
      },
      where: {
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
