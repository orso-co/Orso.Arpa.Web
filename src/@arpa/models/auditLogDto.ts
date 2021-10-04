import { AuditLogType } from './auditLogType';

export interface AuditLogDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  type?: AuditLogType;
  tableName?: string;
  oldValues?: { [key: string]: unknown; };
  newValues?: { [key: string]: unknown; };
  changedColumns?: Array<string>;
}
