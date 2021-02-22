import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

@Component({
  selector: 'arpa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginFormGroup: FormGroup;
  errorMsg = '';
  resendMsg = false;
  loginRequest = false;
  waitForAction = false;
  private subs = new SubSink();
  hide = true;

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private translate: TranslateService

  ) {
    this.loginFormGroup = formBuilder.group({
      usernameOrEmail: [null,
        [
          Validators.required,
          Validators.minLength(1),
        ]
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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submit(): void {
    this.loginRequest = true;
    this.subs.add(this.authService
      .login(Object.assign({}, this.loginFormGroup.value))
      .pipe(
        catchError((error) => {
          this.loginRequest = false;

          if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
              this.errorMsg = this.translate.instant('CONNECTIONERROR');
            } else {
              if (error.error.title) {
                this.errorMsg = error.error.title;
              }
              if (error.error.errors.Email) {
                this.errorMsg = error.error.errors.Email[0];
              }
              if (this.errorMsg.startsWith('Your email address is not confirmed')) {
                this.resendMsg = true;
              }
            }
          }
          return EMPTY;
        })
      )
      .subscribe(() => this.router.navigate(['/'])));
  }

  goToRegister(): void {
    this.router.navigate(['/onboarding/register']);
  }

  onChange(): void {
    this.resendMsg = false;
    this.errorMsg = '';
  }

  resendConfirmationLink(): void {
    this.resendMsg = false;
    this.authService.resendConfirmationLink(this.loginFormGroup.value.usernameOrEmail)
    .pipe(
      catchError((error) => {
      this.loginRequest = false;
      if (error instanceof HttpErrorResponse) {
        this.errorMsg = error.error.errorMessage.Message;
      }
      return EMPTY;
      })
    )
    .subscribe(() => {
      this.errorMsg = 'Bestätigungslink wurde versendet, bitte Mailbox prüfen';
    });
  }
}



