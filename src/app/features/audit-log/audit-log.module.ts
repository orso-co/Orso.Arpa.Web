import { PrettyJsonModule } from './../../../@arpa/pipes/pretty-json/pretty-json.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../../../@arpa/translate';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { AuditDialogComponent } from './audit-dialog/audit-dialog.component';
import { AuditLogRoutingModule } from './audit-log-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { GraphQlFeedModule } from '../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { TableModule } from '../../../@arpa/components/table/table.module';

@NgModule({
  declarations: [AuditLogComponent, AuditDialogComponent],
  imports: [
    CommonModule,
    AuditLogRoutingModule,
    PrettyJsonModule,
    // Arpa Lib
    TranslateModule.forChild(['audit-log']),
    TableModule,
    // NG Prime Dependencies
    ButtonModule,
    InputTextModule,
    GraphQlFeedModule,
  ],
})
export class AuditLogModule {}
