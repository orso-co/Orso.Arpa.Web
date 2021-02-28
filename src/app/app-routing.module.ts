import { LogoutComponent } from './components/onboarding/logout/logout.component';
import { RoleListResolver } from './resolvers/roles-list.resolver';
import { UserListResolver } from './resolvers/user-list.resolver';
import { DashboardGuard } from './guards/dashboard.guard';
import { NoRoleComponent } from './components/dashboards/no-role/no-role.component';
import { RoleNames } from './models/role-names';
import { RoleGuard } from './guards/role.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { StaffComponent } from './components/dashboards/staff/staff.component';
import { AdministratorComponent } from './components/dashboards/administrator/administrator.component';
import { DashboardComponent } from './components/dashboards/dashboard/dashboard.component';
import { OnboardingShellComponent } from './components/onboarding/onboarding-shell/onboarding-shell.component';
import { MainComponent } from './components/shell/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/onboarding/login/login.component';
import { RegisterComponent } from './components/onboarding/register/register.component';
import { PerformerComponent } from './components/dashboards/performer/performer.component';
import { EmailconfirmationComponent } from './components/onboarding/emailconfirmation/emailconfirmation.component';
import { SectionTreeResolver } from './resolvers/section-tree.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'onboarding',
    component: OnboardingShellComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'eMailConfirmation', component: EmailconfirmationComponent },
      {
        path: 'registerConfirmation',
        component: RegisterConfirmationComponent,
      },
      { path: 'logout', component: LogoutComponent }
    ],
  },
  {
    path: 'pages',
    component: MainComponent,
    canActivate: [IsLoggedInGuard],
    canActivateChild: [RoleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardGuard],
        runGuardsAndResolvers: 'always',
        children: [
          { path: 'performer', component: PerformerComponent, data: { roles: [RoleNames.performer] } },
          {
            path: 'admin',
            component: AdministratorComponent,
            data: { roles: [RoleNames.admin], treeMaxLevel: 2 },
            resolve: { users: UserListResolver, sectionTreeLoaded: SectionTreeResolver, rolesLoaded: RoleListResolver },
          },
          { path: 'staff', component: StaffComponent, data: { roles: [RoleNames.staff] } },
          { path: 'noRole', component: NoRoleComponent },
        ],
      },
    ],
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
