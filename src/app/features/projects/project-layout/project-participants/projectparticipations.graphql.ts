import { gql } from 'apollo-angular';

export interface ProjectParticipationsQueryResponse {
  id: string;
  title: string;
  children: {
    title: string;
    id: string;
  }[];
  parent: {
    title: string;
    id: string;
  };
  projectParticipations: {
    participationStatusInner: string;
    participationStatusInternal: string;
    participationStatusResult: string;
    invitationStatus: string;
    commentByStaffInner: string;
    commentTeam: string;
    modifiedAt: Date;
    modifiedBy: string;
    musicianProfile: {
      id: string;
      instrument: {
        name: string;
      };
      qualification: {
        selectValue: {
          name: string;
        };
      };
      person: {
        id: string;
        surname: string;
        givenName: string;
        displayName: string;
        user: {
          id: string;
          normalizedEmail: string;
        };
      };
      preferredPositionsTeam: {
        selectValueSection: {
          selectValue: {
            name: string;
          };
        };
      };
    };
  }[];
}

export const ProjectParticipationsQuery = gql`
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
        children {
          title
          id
        }
        parent {
          title
          id
        }
        projectParticipations {
          participationStatusInner
          participationStatusInternal
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
              user {
                id
                normalizedEmail
              }
            }
            preferredPositionsTeam {
              selectValueSection {
                selectValue {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
