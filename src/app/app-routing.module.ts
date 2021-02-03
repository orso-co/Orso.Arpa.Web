import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerformerComponent } from './components/performer/performer.component';
import { EmailconfirmationComponent } from './components/emailconfirmation/emailconfirmation.component';


const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'emailConfirmation',   redirectTo: '/emailConfirmation', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'performer', component: PerformerComponent },
  { path: 'eMailConfirmation', component: EmailconfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

