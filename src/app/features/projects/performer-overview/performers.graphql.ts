import { gql } from 'apollo-angular';

export const PerformersQuery = gql`
  query Projects($projectId: UUID) {
    projects(where: { id: { equals: $projectId } }) {
      items {
        id
        title
        children {
          title
          id
        }
        parent {
          title
          id
        }
        projectParticipations {
          participationStatusResult
          invitationStatus
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
        projectAppointments {
          appointment {
            id
            name
            startTime
            appointmentParticipations {
              id
              prediction
              personId
            }
          }
        }
      }
    }
  }
`;
