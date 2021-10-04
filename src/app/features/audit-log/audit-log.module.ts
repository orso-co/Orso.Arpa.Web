import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '../../../@arpa/translate';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { AuditDialogComponent } from './audit-dialog/audit-dialog.component';
import { AuditDialogDirective } from './audit-log/audit-dialog.directive';
import { AuditLogRoutingModule } from './audit-log-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AuditLogComponent,
    AuditDialogComponent,
    AuditDialogDirective,
  ],
  imports: [
    CommonModule,
    AuditLogRoutingModule,
    // Arpa Lib
    TranslateModule.forChild(['audit-log']),
    // NG Prime Dependencies
    TableModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class AuditLogModule {
}
