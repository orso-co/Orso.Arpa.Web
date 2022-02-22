import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ViewsComponent } from './views.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ActivationPageComponent } from './activation-page/activation-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { EmailConfirmationPageComponent } from './emailconfirmation-page/email-confirmation-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { RegErrorPageComponent } from './reg-error-page/reg-error-page.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'error', component: ErrorPageComponent,
        data: { title: 'views.ERROR', error: 404, type: 'RouteNotFound', message: 'error.ROUTE_NOT_FOUND' },
      },
      {
        path: 'login', component: LoginPageComponent,
        data: { sessionPrevent: true, title: 'LOGIN' },
      },
      { path: 'register', component: RegisterPageComponent, data: { sessionPrevent: true, title: 'views.REGISTER' } },
      {
        path: 'activation',
        component: ActivationPageComponent,
        data: { sessionPrevent: true, title: 'views.ACCOUNT_ACTIVATION' },
      },
      {
        path: 'regError',
        component: RegErrorPageComponent,
        data: { sessionPrevent: true, title: 'views.REGISTRATION_ERROR' },
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordPageComponent,
        data: { sessionPrevent: true, title: 'views.CHANGE_PASSWORD' },
      },
      {
        path: 'eMailConfirmation',
        component: EmailConfirmationPageComponent,
        data: { sessionPrevent: true, title: 'views.EMAIL_CONFIRMATION' },
      },
      { path: 'logout', component: LogoutPageComponent, data: { title: 'views.LOGOUT' } },
      { path: 'privacy', component: PrivacyPageComponent, data: { title: 'views.PRIVACY_POLICY' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {
}
