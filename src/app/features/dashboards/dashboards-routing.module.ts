import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PerformerComponent} from './performer/performer.component';
import {RoleNames} from '../../models/role-names';
import {ProjectListResolver} from '../../resolvers/project-list.resolver';
import {AdministratorComponent} from './administrator/administrator.component';
import {SectionTreeResolver} from '../../resolvers/section-tree.resolver';
import {UserListResolver} from '../../resolvers/user-list.resolver';
import {StaffComponent} from './staff/staff.component';
import {NoRoleComponent} from './no-role/no-role.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardGuard} from './guards/dashboard.guard';
import {RoleListResolver} from '../../resolvers/roles-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'performer', component: PerformerComponent,
        data: {roles: [RoleNames.performer]},
        resolve: {projects: ProjectListResolver}
      },
      {
        path: 'admin',
        component: AdministratorComponent,
        data: {roles: [RoleNames.admin], treeMaxLevel: 2},
        resolve: {users: UserListResolver, sectionTreeLoaded: SectionTreeResolver, rolesLoaded: RoleListResolver},
      },
      {
        path: 'staff', component: StaffComponent,
        data: {roles: [RoleNames.staff]},
        resolve: {projects: ProjectListResolver}
      },
      {path: 'noRole', component: NoRoleComponent},
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule {
}
