import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { IResetPasswordDto } from '../../models/IResetPasswordDto';
import { ConfigService } from '../../core/services/config.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'arpa-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordRequest = false;
  forgotPasswordFormGroup: FormGroup;
  hide = true;

  constructor(formBuilder: FormBuilder,
              private authService: AuthService,
              private configService: ConfigService,
              private notificationsService: NotificationsService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
    this.forgotPasswordFormGroup = formBuilder.group({
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(this.configService.getEnv('validation').password),
        ],
      ],
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.forgotPasswordRequest = true;
    this.route.queryParams
      .pipe(first())
      .subscribe(params => {
        const resetPassword: IResetPasswordDto = {
          usernameOrEmail: params.email,
          password: this.forgotPasswordFormGroup.value.password,
          token: params.token,
        };
        this.authService
          .resetPassword(resetPassword)
          .pipe(first())
          .subscribe(() => {
            this.notificationsService.success('forgotpassword.CHANGED');
            this.router.navigate(['/login']);
          });
      });
    this.forgotPasswordRequest = false;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
