import { AuditLogType } from './auditLogType';

export interface AuditLogDto {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  type?: AuditLogType;
  tableName?: string;
  oldValuesJson?: string;
  newValuesJson?: string;
  changedColumns?: Array<string>;
  keyValues?: string;
}
