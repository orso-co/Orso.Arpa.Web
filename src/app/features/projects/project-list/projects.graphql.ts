import { ProjectStatus } from '@arpa/models';
import { gql } from 'apollo-angular';

export interface ProjectsQueryResponse {
  id: string;
  title: string;
  startDate?: Date;
  endDate?: Date;
  status: ProjectStatus;
  isCompleted: boolean;
  isHiddenForPerformers: boolean;
  genreId?: string;
  genre?: {
    selectValue: {
      name: string;
    };
  };
  typeId?: string;
  parentId?: string;
  shortTitle: string;
  description?: string;
  code: string;
  children: { title: string; id: string }[];
  parent?: { title: string; id: string };
  urls: ProjectsQueryUrlResponse[];
}

export interface ProjectsQueryUrlResponse {
  id: string;
  href: string;
  anchorText?: string;
  urlRoles: {
    id: string;
    role: {
      id: string;
      roleName: string;
      roleLevel: number;
    };
  };
}

export const ProjectsQuery = gql`
  query Projects(
    $skip: Int
    $take: Int = 20
    $orderEndDate: SortEnumType = DESC
    $orderGenreId: SortEnumType = ASC
    $orderStatus: SortEnumType = ASC
    $searchQuery: String = ""
  ) {
    projects(
      skip: $skip
      take: $take
      order: { endDate: $orderEndDate, genre: { selectValue: { name: $orderGenreId } }, status: $orderStatus }
      where: {
        or: [{ title: { contains: $searchQuery } }, { code: { contains: $searchQuery } }, { shortTitle: { contains: $searchQuery } }]
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
        startDate
        endDate
        status
        isCompleted
        isHiddenForPerformers
        genreId
        genre {
          selectValue {
            name
          }
        }
        typeId
        parentId
        shortTitle
        description
        code
        children {
          title
          id
        }
        parent {
          title
          id
        }
        urls {
          id
          href
          anchorText
          urlRoles {
            id
            role {
              id
              roleName: name
              roleLevel: level
            }
          }
        }
      }
    }
  }
`;
