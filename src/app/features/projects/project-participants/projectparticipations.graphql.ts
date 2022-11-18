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
        projectParticipations {
          participationStatusInner
          participationStatusInternal
          musicianProfile {
            instrument {
              name
            }
            person {
              displayName
            }
          }
        }
      }
    }
  }
`;
