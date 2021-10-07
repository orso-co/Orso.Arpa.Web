import { gql } from 'apollo-angular';

export const ProfileQuery = gql`
  query Projects($personId: UUID){
    musicianProfiles(first:50, order: { isMainProfile: DESC } where: {
      personId: { equals: $personId },
    }
    ) {
      pageInfo {
        hasNextPage,
        hasPreviousPage
      }

      items {
        id,
        isMainProfile,
        levelAssessmentInner,
        levelAssessmentTeam,
        deactivation {
          deactivationStart,
        },
        instrument {
          name,
          createdAt
        },
      }
    }
  }`;
