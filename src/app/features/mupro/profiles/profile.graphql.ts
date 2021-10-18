import { gql } from 'apollo-angular';

export const ProfileQuery = gql`
  query Profile($personId: UUID){
    musicianProfiles(take:50, order: { isMainProfile: DESC, instrument: { name: ASC } } where: {
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
          id,
          name,
          createdAt
        },
      }
    }
  }`;
