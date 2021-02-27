import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

@Component({
  selector: 'arpa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginFormGroup: FormGroup;
  loginRequest = false;
  private subs = new SubSink();
  hide = true;

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastService: ToastService

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
      .subscribe(
        response => {this.router.navigate(['/']); },
        error => {
          this.loginRequest = false;
          // following lines are workaround to identify if confirmation link should be recent
          // will not work when backend send error text in other language or text will change
          error.forEach( (v: string) => {
            if (v.startsWith('Your email address is not confirmed')) {
              this.resendConfirmationLink();
            }
          });
        }));
  }

  goToRegister(): void {
    this.router.navigate(['/onboarding/register']);
  }

  resendConfirmationLink(): void {
    this.authService
    .resendConfirmationLink(this.loginFormGroup.value.usernameOrEmail)
    .subscribe(() => {
        this.toastService.eccor('login.RESENDDONE');
        });
  }
}



