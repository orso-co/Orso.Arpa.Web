import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, first, map } from 'rxjs/operators';
import { SelectValueService, ConfigService, LoadingService, NotificationsService, AuthService } from '@arpa/services';

@Component({
  selector: 'arpa-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  // @ViewChild('captchaRef') reCaptcha: RecaptchaComponent;
  validPassword: boolean = false;
  registerRequest: boolean = false;
  registerFormGroup: FormGroup;
  hide: boolean = true;
  // siteKey: string;
  genderSelectValue: any;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private loadingService: LoadingService,
    private selectValueService: SelectValueService,
    private configService: ConfigService
  ) {
    // this.siteKey = configService.getEnv('captcha').key;

    this.genderSelectValue = this.selectValueService.get('Person', 'Gender');

    this.registerFormGroup = formBuilder.group({
      genderId: [null, [Validators.required]],
      userName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
      givenName: [null, [Validators.required, Validators.maxLength(50)]],
      surname: [null, [Validators.required, Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.pattern(configService.getEnv('validation').email)]],
      password: [null, [Validators.required, Validators.pattern(configService.getEnv('validation').password)]],
      confirmPassword: [null, [Validators.required, this.comparePasswords]],
      privacyPolicy: [null, [Validators.required]],
    });
  }

  setPasswordState(state: boolean) {
    this.validPassword = state;
  }

  reValidate(el: AbstractControl) {
    el.updateValueAndValidity();
  }

  comparePasswords(formControl: AbstractControl) {
    if (formControl['_parent']) {
      const password = formControl['_parent'].get('password')?.value;
      const confirmPassword = formControl.value;
      return password === confirmPassword ? null : { notSame: true };
    } else {
      return { notSame: true };
    }
  }

  // onSubmit(): void {
  //   this.loadingService.loadingOn();
  //   this.reCaptcha.execute();
  // }

  onError(): void {
    this.notificationsService.error('SOMETHING_WENT_WRONG');
  }

  submit(): void {
    this.authService
      .register(Object.assign({}, this.registerFormGroup.value))
      .pipe(
        first(),
        finalize(() => {
          this.loadingService.reset();
        })
      )
      .subscribe(
        () => {
          this.notificationsService.info('REGISTER_SUCCESS', 'views');
          this.router.navigate(['activation']);
        },
        (error) => {
          if (error.status < 500 && error.errors) {
            Object.keys(error.errors).forEach((prop) => {
              const formProp = prop[0].toLowerCase() + prop.slice(1);
              const formControl = this.registerFormGroup.get(formProp);
              if (formControl) {
                formControl.setErrors({
                  resultError: error.errors[prop],
                });
                formControl.markAsTouched();
              }
            });
          } else {
            this.router.navigate(['regError']);
          }
        }
      );
  }

  onChange(): void {
    this.registerRequest = false;
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }
}
