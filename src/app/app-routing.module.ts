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
        loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: {
          title: 'DASHBOARD',
          menu: {
            name: 'feature',
            label: 'DASHBOARD',
            icon: 'pi pi-home',
          },
        },
      },
      {
        path: 'news',
        loadChildren: () => import('./features/news/news.module').then((m) => m.NewsModule),
        data: {
          roles: ['staff'],
          title: 'NEWS',
          menu: {
            name: 'feature',
            label: 'NEWS',
            icon: 'pi pi-bell',
          },
        },
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/projects.module').then((m) => m.ProjectsModule),
        data: {
          roles: ['staff'],
          title: 'projects.PAGE_TITLE',
          menu: {
            name: 'feature',
            label: 'PROJECTS',
            icon: 'pi pi-th-large',
          },
        },
      },
      {
        path: 'calendar',
        loadChildren: () => import('./features/appointments/appointments.module').then((m) => m.AppointmentsModule),
        data: {
          roles: ['staff'],
          title: 'appointments.PAGE_TITLE',
          menu: {
            name: 'feature',
            label: 'CALENDAR',
            icon: 'pi pi-calendar',
          },
        },
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then((m) => m.ProfileModule),
        data: {
          title: 'profile.PAGE_TITLE',
        },
      },

      {
        path: 'persons',
        loadChildren: () => import('./features/persons/persons.module').then((m) => m.PersonsModule),
        data: {
          roles: ['staff'],
          title: 'persons.PERSONS',
          menu: {
            name: 'feature',
            label: 'persons',
            icon: 'pi pi-users',
          },
        },
      },
      {
        path: 'performer',
        loadChildren: () => import('./features/performer/performers.module').then((m) => m.PerformersModule),
        data: {
          roles: ['staff'],
          title: 'PERFORMER',
          menu: {
            name: 'feature',
            label: 'PERFORMER',
            icon: 'pi pi-users',
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
            icon: 'pi pi-clone',
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
            icon: 'pi pi-info-circle',
          },
        },
      },
      {
        path: 'venues',
        loadChildren: () => import('./features/venues/venues.module').then((mod) => mod.VenuesModule),
        data: {
          roles: ['staff'],
          title: 'VENUES',
          menu: {
            name: 'feature',
            label: 'VENUES',
            icon: 'pi pi-map-marker',
          },
        },
      },
      {
        path: '*',
        loadChildren: () => import('./features/profile/profile.module').then((mod) => mod.ProfileModule),
        data: {
          roles: ['performer', 'staff', 'admin'],
          title: 'MY_PROFILE',
          menu: {
            name: 'feature',
            label: '- - - - - - - - - - - - - - -',
          },
        },
      },
      {
        path: 'profile/my-data',
        loadChildren: () => import('./features/profile/profile.module').then((mod) => mod.ProfileModule),
        data: {
          roles: ['performer', 'staff', 'admin'],
          title: 'MY_DATA',
          menu: {
            name: 'feature',
            label: 'MY_DATA',
            icon: 'pi pi-user-edit',
          },
        },
      },

      {
        path: 'profile/my-projects',
        loadChildren: () => import('./features/profile/profile.module').then((mod) => mod.ProfileModule),
        data: {
          roles: ['performer', 'admin'],
          title: 'MY_PROJECTS',
          menu: {
            name: 'feature',
            label: 'MY_PROJECTS',
            icon: 'pi pi-th-large',
          },
        },
      },
    ],
  },
  {
    path: '',
    canActivateChild: [SessionGuard],
    component: LayoutPageComponent,
    loadChildren: () => import('./features/views/views.module').then((m) => m.ViewsModule),
  },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
