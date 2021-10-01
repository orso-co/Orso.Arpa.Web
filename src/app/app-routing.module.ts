import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageLayoutComponent } from './main/layout/page-layout/page-layout.component';
import { ErrorComponent } from './main/error/error.component';
import { DefaultLayoutComponent } from './main/layout/default-layout/default-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { PrivacyComponent } from './main/privacy/privacy.component';
import { LogoutComponent } from './main/logout/logout.component';
import { EmailConfirmationComponent } from './main/emailconfirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
import { SessionGuard } from './core/guards/session.guard';
import { AuditLogComponent } from './shared/audit-log/audit-log.component';
import { AuditLogResolver } from './resolvers/auditlog.resolver';
import { ActivationComponent } from './main/activation/activation.component';
import { RegErrorComponent } from './main/reg-error/reg-error.component';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    canActivateChild: [SessionGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'error',
        component: ErrorComponent,
        pathMatch: 'full',
        data: { error: 404, type: 'RouteNotFound', message: 'error.ROUTE_NOT_FOUND' },
      },
      { path: 'login', component: LoginComponent, data: { sessionPrevent: true } },
      { path: 'register', component: RegisterComponent, data: { sessionPrevent: true } },
      { path: 'activation', component: ActivationComponent, data: { sessionPrevent: true } },
      { path: 'regError', component: RegErrorComponent, data: { sessionPrevent: true } },
      { path: 'forgotPassword', component: ForgotPasswordComponent, data: { sessionPrevent: true } },
      { path: 'eMailConfirmation', component: EmailConfirmationComponent, data: { sessionPrevent: true } },
      { path: 'logout', component: LogoutComponent },
      { path: 'privacy', component: PrivacyComponent },
    ],
  },
  {
    path: 'arpa',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    runGuardsAndResolvers: 'always',
    component: DefaultLayoutComponent,
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
          }
        }
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
          }
        }
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
        data: {
          title: 'profile.PAGE_TITLE',
        }
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
          }
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
        }
      },
      {
        path: 'auditlogs',
        component: AuditLogComponent,
        resolve: { auditLogs: AuditLogResolver},
        data: {
          roles: ['staff', 'admin'],
          title: 'auditlogs.AUDITLOGS',
          menu: {
            name: 'feature',
            label: 'auditlogs.AUDITLOGS',
            icon: 'pi pi-search-plus',
          },
        }
      },
    ],
  },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    paramsInheritanceStrategy: 'always',
    onSameUrlNavigation: "reload",
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
