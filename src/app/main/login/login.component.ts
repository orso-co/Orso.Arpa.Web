import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '../../core/services/notifications.service';
import { LoadingService } from '../../core/services/loading.service';
import { AuthService } from '../../core/services/auth.service';

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
              private loadingService: LoadingService,
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
    this.loadingService.loadingOn();
    this.authService
      .login(Object.assign({}, this.loginFormGroup.value))
      .subscribe(
        response => {
          this.router.navigate(['/arpa']);
        },
        error => {
          this.loadingService.loadingOff();
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

  }

  forgotPassword(): void {

  }
}