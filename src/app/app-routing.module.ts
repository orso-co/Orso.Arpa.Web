import { PersonListComponent } from './features/persons/person-list/persons-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../@arpa/guards/auth.guard';
import { RoleGuard } from '../@arpa/guards/role.guard';
import { SessionGuard } from '../@arpa/guards/session.guard';
import { LayoutDefaultComponent } from '../@arpa/layout/layout-default/layout-default.component';
import { LayoutPageComponent } from '../@arpa/layout/layout-page/layout-page.component';

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
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          title: 'DASHBOARD',
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
        path: 'persons',
        loadChildren: () => import('./features/persons/persons.module').then(m => m.PersonsModule),
        data: {
          roles: ['staff'],
          title: 'persons.PERSONS',
          menu: {
            name: 'feature',
            label: 'persons.PERSONS',
            icon: 'pi pi-users',
          },
        }
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
        loadChildren: () => import('./features/audit-log/audit-log.module').then((mod) => mod.AuditLogModule),
        data: {
          roles: ['staff', 'admin'],
          title: 'AUDITLOG',
          menu: {
            name: 'feature',
            label: 'AUDITLOG',
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
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
