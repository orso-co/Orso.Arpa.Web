import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RoleDashboardResolver } from './role-dashboard-resolver.service';

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
