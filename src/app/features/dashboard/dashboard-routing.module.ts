import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RoleDashboardResolver } from './role-dashboard-resolver.service';
import { DashboardRoleGuard } from './dashboard-role.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      dashboardRole: RoleDashboardResolver,
    },
  }, {
    path: ':role',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canActivate: [DashboardRoleGuard],
    component: DashboardComponent,
    resolve: {
      dashboardRole: RoleDashboardResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
