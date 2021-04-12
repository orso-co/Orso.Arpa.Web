import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '../../core/services/notifications.service';
import { AuthService } from '../../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'arpa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
          // following lines are workaround to identify if confirmation link should be recent
          // will not work when backend send error text in other language or text will change
          error.forEach((v: string) => {
            if (v.startsWith('Your email address is not confirmed')) {
              this.resendConfirmationLink();
            }
          });
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
        this.notificationsService.info('login.RESENDDONE');
      });
  }

  forgotPassword(): void {
    this.authService.forgotPassword(this.loginFormGroup.value.usernameOrEmail)
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.success('forgotpassword.SENT');
      });
  }
}
