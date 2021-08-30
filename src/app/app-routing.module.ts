import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { SessionGuard } from './core/guards/session.guard';
import { AuditLogComponent } from './shared/audit-log/audit-log.component';
import { AuditLogResolver } from './resolvers/auditlog.resolver';
import { LayoutDefaultComponent } from './main/layout/layout-default/layout-default.component';
import { LayoutPageComponent } from './main/layout/layout-page/layout-page.component';

const routes: Routes = [
  {
    path: 'arpa',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    runGuardsAndResolvers: 'always',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboards/dashboards.module').then(m => m.DashboardsModule),
        data: {
          title: 'dashboard.PAGE_TITLE',
          menu: {
            name: 'feature',
            label: 'DASHBOARD',
            icon: 'icon-list',
          },
        },
      },
      {
        path: 'appointments',
        loadChildren: () => import('./features/appointments/appointments.module').then(m => m.AppointmentsModule),
        data: {
          roles: ['performer', 'staff'],
          title: 'appointments.PAGE_TITLE',
          menu: {
            name: 'feature',
            label: 'APPOINTMENTS',
            icon: 'icon-calendar',
          },
        },
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
        data: {
          title: 'profile.PAGE_TITLE',
        },
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/projects.module').then(m => m.ProjectsModule),
        data: {
          roles: ['performer', 'staff'],
          title: 'projects.PAGE_TITLE',
          menu: {
            name: 'feature',
            label: 'PROJECTS',
            icon: 'icon-stack',
          },
        },
      },
      {
        path: 'mupro',
        loadChildren: () => import('./features/mupro/mupro.module').then((mod) => mod.MuProModule),
        data: {
          roles: ['staff'],
          title: 'mupro.PAGE_TITLE',
          menu: {
            name: 'feature',
            label: 'MUPRO',
            icon: 'pi pi-users',
          },
        },
      },
      {
        path: 'auditlogs',
        component: AuditLogComponent,
        resolve: { auditLogs: AuditLogResolver },
        data: {
          roles: ['staff', 'admin'],
          title: 'auditlogs.AUDITLOGS',
          menu: {
            name: 'feature',
            label: 'auditlogs.AUDITLOGS',
            icon: 'pi pi-search-plus',
          },
        },
      },
    ],
  },
  {
    path: '',
    canActivateChild: [SessionGuard],
    component: LayoutPageComponent,
    loadChildren: () => import('./features/views/views.module').then(m => m.ViewsModule),
  },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    // paramsInheritanceStrategy: 'always',
    // onSameUrlNavigation: "reload",
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
