import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './error/error.component';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailConfirmationComponent } from './emailconfirmation/email-confirmation.component';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    PrivacyComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    EmailConfirmationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    LayoutModule,
    RecaptchaModule,
  ],
})
export class MainModule {
}
