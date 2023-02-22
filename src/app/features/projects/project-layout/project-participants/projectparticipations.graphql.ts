import { gql } from 'apollo-angular';

export const ProjectsQuery = gql`
  query Projects(
    $projectId: UUID
  ) {
    projects(
      where: {
        id: {equals: $projectId}
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
        projectParticipations {
          invitationStatus
          participationStatusInner
          participationStatusInternal
          commentByStaffInner
          commentTeam
          musicianProfile {
            id
            instrument {
              name
            }
            person {
              id
              surname
              givenName
              displayName
            }
          }
        }
      }
    }
  }
`;
