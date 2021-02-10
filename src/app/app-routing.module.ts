import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/onboarding/login/login.component';
import { RegisterComponent } from './components/onboarding/register/register.component';
import { PerformerComponent } from './components/dashboards/performer/performer.component';
import { EmailconfirmationComponent } from './components/onboarding/emailconfirmation/emailconfirmation.component';
import { RegisterConfirmationComponent } from './components/onboarding/registerconfirmation/registerconfirmation.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'performer', component: PerformerComponent },
  { path: 'eMailConfirmation', component: EmailconfirmationComponent },
  { path: 'registerConfirmation', component: RegisterConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

