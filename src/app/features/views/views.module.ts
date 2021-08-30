import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { CommonTranslateModule } from '../../common/translate';
import { SharedModule } from '../../shared/shared.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { ActivationPageComponent } from './activation-page/activation-page.component';
import { EmailConfirmationPageComponent } from './emailconfirmation-page/email-confirmation-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { RegErrorPageComponent } from './reg-error-page/reg-error-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    ActivationPageComponent,
    EmailConfirmationPageComponent,
    ErrorPageComponent,
    ForgotPasswordPageComponent,
    LoginPageComponent,
    LogoutPageComponent,
    PrivacyPageComponent,
    RegErrorPageComponent,
    RegisterPageComponent,
    ViewsComponent,
  ],
  imports: [
    CommonModule,
    CommonTranslateModule.forChild(['views']),
    ViewsRoutingModule,
    SharedModule,
    RecaptchaModule,
  ],
})
export class ViewsModule {
}
