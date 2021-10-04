import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ActivationPageComponent } from './activation-page/activation-page.component';
import { EmailConfirmationPageComponent } from './emailconfirmation-page/email-confirmation-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { RegErrorPageComponent } from './reg-error-page/reg-error-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LangSwitchModule } from '../../../@arpa/components/lang-switch/lang-switch.module';
import { BackButtonModule } from '../../../@arpa/directives/back-button/back-button.module';
import { TranslateModule } from '../../../@arpa/translate';
import { PasswordStrengthModule } from '../../../@arpa/components/password-strength/password-strength.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';


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
    FormsModule,
    ReactiveFormsModule,
    ViewsRoutingModule,
    // Arpa Lib
    TranslateModule.forChild(['views']),
    LangSwitchModule,
    BackButtonModule,
    PasswordStrengthModule,
    FormFieldModule,
    // NG Prime Dependencies
    RecaptchaModule,
    ButtonModule,
    PasswordModule,
    DropdownModule,
    InputTextModule,
  ],
})
export class ViewsModule {
}
