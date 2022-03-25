import { gql } from 'apollo-angular';

export const AuditLogQuery = gql`
  query AuditLog(
    $skip: Int,
    $take: Int,
    $orderCreatedAt: SortEnumType = DESC,
    $orderTableName: SortEnumType = DESC,
    $orderType: SortEnumType = DESC,
    $orderCreatedBy: SortEnumType = DESC,
    $searchQuery: String = ""
  ) {
    auditLogs(
      skip: $skip
      take: $take
      order: {
        createdAt: $orderCreatedAt,
        tableName: $orderTableName,
        type: $orderType,
        createdBy: $orderCreatedBy,
      },
      where: {
        or: [
          { tableName: { contains:$searchQuery}},
          { oldValuesJson: { contains:$searchQuery}},
          { keyValues: { contains:$searchQuery}},
          { createdBy: { contains:$searchQuery}},
        ]

      }
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
