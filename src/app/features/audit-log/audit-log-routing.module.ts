import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { AuditLogResolver } from './resolvers/auditlog.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuditLogComponent,
    resolve: { auditLogs: AuditLogResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditLogRoutingModule {
}
