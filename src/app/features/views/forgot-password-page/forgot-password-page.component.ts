import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../@arpa/services/auth.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { ResetPasswordDto } from '../../../../@arpa/models/resetPasswordDto';
import { ConfigService } from '../../../../@arpa/services/config.service';

@Component({
  selector: 'arpa-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent {
  forgotPasswordRequest = false;
  forgotPasswordFormGroup: UntypedFormGroup;
  hide = true;

  constructor(
    formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private configService: ConfigService,
    private notificationsService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.forgotPasswordFormGroup = formBuilder.group({
      password: [null, [Validators.required, Validators.pattern(this.configService.getEnv('validation').password)]],
    });
  }

  submit(): void {
    this.forgotPasswordRequest = true;
    this.route.queryParams.pipe(first()).subscribe((params) => {
      const resetPassword: ResetPasswordDto = {
        usernameOrEmail: params.email,
        password: this.forgotPasswordFormGroup.value.password,
        token: params.token,
      };
      this.authService
        .resetPassword(resetPassword)
        .pipe(first())
        .subscribe(() => {
          this.notificationsService.success('PASSWORD_CHANGE_SUCCESS');
          this.router.navigate(['/login']);
        });
    });
    this.forgotPasswordRequest = false;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
