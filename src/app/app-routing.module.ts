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
import { EmailconfirmationComponent } from './main/emailconfirmation/emailconfirmation.component';
import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
import { SessionGuard } from './core/guards/session.guard';

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
      { path: 'password', component: ForgotPasswordComponent, data: { sessionPrevent: true } },
      { path: 'eMailConfirmation', component: EmailconfirmationComponent, data: { sessionPrevent: true } },
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
      },
      {
        path: 'appointments',
        loadChildren: () => import('./features/appointments/appointments.module').then(m => m.AppointmentsModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'me',
        loadChildren: () => import('./features/me/me.module').then((mod) => mod.MeModule),
      },
    ],
  },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    paramsInheritanceStrategy: 'always',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
