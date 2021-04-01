import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { StaffComponent } from './staff/staff.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { PerformerComponent } from './performer/performer.component';
import { NoRoleComponent } from './no-role/no-role.component';
import { DummyComponent } from './dummy/dummy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { DashboardsRoutingModule } from './dashboards-routing.module';

@NgModule({
  declarations: [
    UserListComponent,
    StaffComponent,
    ProjectListComponent,
    PerformerComponent,
    NoRoleComponent,
    DummyComponent,
    DashboardComponent,
    AdministratorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
  ],
})
export class DashboardsModule {
}
