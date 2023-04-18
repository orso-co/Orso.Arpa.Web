import { gql } from 'apollo-angular';

export const ProjectsQuery = gql`
  query Projects($projectId: UUID) {
    projects(where: { id: { equals: $projectId } }) {
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
          participationStatusResult
          commentByStaffInner
          commentTeam
          modifiedAt
          modifiedBy
          musicianProfile {
            id
            instrument {
              name
            }
            qualification {
              selectValue {
                name
              }
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
