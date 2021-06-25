import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { StaffComponent } from './staff/staff.component';
import { PerformerComponent } from './performer/performer.component';
import { NoRoleComponent } from './no-role/no-role.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { ProjectsModule } from '../projects/projects.module';
import { UserchartComponent } from './userchart/userchart.component';
import { ProjectgenrechartComponent } from './projectgenrechart/projectgenrechart.component';

@NgModule({
  declarations: [
    UserListComponent,
    StaffComponent,
    PerformerComponent,
    NoRoleComponent,
    DashboardComponent,
    AdministratorComponent,
    UserchartComponent,
    ProjectgenrechartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    ProjectsModule,

  ],
})
export class DashboardsModule {
}
