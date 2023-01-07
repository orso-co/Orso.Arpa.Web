import { gql } from 'apollo-angular';

export const ProjectAppointments = gql`
  query getAppointmentsForProject($projectId: UUID) {
    projects(
      where: {
        id: { equals: $projectId }
      }
    ) {
      items {
        projectAppointments {
          appointment {
            id
            name
            createdBy
            createdAt
            startTime
            endTime
            status
            category {
              id
            }
            venue {
              id
              name
            }
          }
        }
      }
    }
  }
`;
