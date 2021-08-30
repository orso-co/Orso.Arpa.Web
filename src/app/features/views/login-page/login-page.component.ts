import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NotificationsService } from '../../../core/services/notifications.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'arpa-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginFormGroup: FormGroup;
  hide = true;

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private notificationsService: NotificationsService,
              private authService: AuthService,
  ) {
    this.loginFormGroup = formBuilder.group({
      usernameOrEmail: [null,
        [
          Validators.required,
          Validators.minLength(1),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
    });
  }

  submit(): void {
    this.authService
      .login(Object.assign({}, this.loginFormGroup.value))
      .pipe(first())
      .subscribe(
        response => {
          this.router.navigate(['/arpa']);
        },
        error => {
          if (error.status === 401) {
            this.notificationsService.error('error.USER_CREDENTIALS');
          } else if (error.status === 403) {
            this.notificationsService.error(error.title);
          } else if (Object.keys(error.errors).length) {
            Object.keys(error.errors).forEach((e) => {
              error.errors[e].forEach((message: string) => {
                this.notificationsService.error(message);
                if (message.startsWith('Your email address is not confirmed')) {
                  // ToDo: This could lead to spamming users.
                  this.resendConfirmationLink();
                }
              });
            });
          }
        });
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }

  resendConfirmationLink(): void {
    this.authService
      .resendConfirmationLink(this.loginFormGroup.value.usernameOrEmail)
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.info('auth.RESEND_DONE');
      });
  }

  forgotPassword(): void {
    this.authService.forgotPassword(this.loginFormGroup.value.usernameOrEmail)
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.success('auth.FORGOT_PASSWORD_SEND_MAIL_SUCCESS');
      });
  }
}
