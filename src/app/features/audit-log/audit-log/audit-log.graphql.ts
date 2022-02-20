import { gql } from 'apollo-angular';

export const AuditLogQuery = gql`
  query AuditLog(
    $skip: Int
    $take: Int
    $orderName: SortEnumType = DESC
    $orderSurname: SortEnumType = DESC
    $orderAboutMe: SortEnumType = DESC
  ) {
    auditLogs(
      skip: $skip
      take: $take
      order: { createdAt: $orderName, tableName: $orderSurname, type: $orderAboutMe, createdBy: $orderAboutMe }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }

      totalCount

      items {
        createdAt
        type
        tableName
        createdBy
        oldValuesJson
        newValuesJson
        changedColumns
        keyValues
      }
    }
  }
`;
