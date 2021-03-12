import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CustomRegex } from '../../../utils/CustomRegex';
import { ToastService } from '../../../services/toast.service';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { IResetPasswordDto } from '../../..//models/IResetPasswordDto';

@Component({
  selector: 'arpa-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordRequest = false;
  forgotPasswordFormGroup: FormGroup;
  hide = true;
  private subs = new SubSink();

  constructor(formBuilder: FormBuilder,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute
              ) {
    this.forgotPasswordFormGroup = formBuilder.group({
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(CustomRegex.PASSWORD)
        ],
      ],
    });
  }

  ngOnInit(): void {
  }

  submit(): void{
    // subs.add noch integrieren
    // wohin navigieren? am besten direkt eingeloggt zum Dashboard...
    this.forgotPasswordRequest = true;
    this.route.queryParams
    .subscribe(params => {
      const resetPassword: IResetPasswordDto = {
        usernameOrEmail: params.email,
        password: this.forgotPasswordFormGroup.value.password,
        token: params.token, };
      this.authService
      .resetPassword(resetPassword)
      .subscribe(() => {
        this.toastService.success('forgotpassword.CHANGED');
        this.router.navigate(['/onboarding/login']);
      });
    });
    this.forgotPasswordRequest = false;
  }

  goToLogin(): void {
    this.router.navigate(['/onboarding/login']);
  }

}
