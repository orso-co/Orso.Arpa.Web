import { DashboardGuard } from './guards/dashboard.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { DashboardSelectorComponent } from './components/dashboards/dashboard-selector/dashboard-selector.component';
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
import { RegisterConfirmationComponent } from './components/onboarding/registerconfirmation/registerconfirmation.component';

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
    ],
  },
  {
    path: 'pages',
    component: MainComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'select'},
          { path: 'select', component: DashboardSelectorComponent, canActivate: [DashboardGuard] },
          { path: 'performer', component: PerformerComponent },
          { path: 'admin', component: AdministratorComponent },
          { path: 'staff', component: StaffComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
