export interface IAuditLog {
  id: string;
  createdBy: string;
  createdAt: string;
  type: number;
  tableName: string;
  oldValues: Record<string, unknown>;
  newValues: Record<string, unknown>;
  changedColumns: string[];
}
