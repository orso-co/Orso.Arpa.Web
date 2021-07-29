import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from '../../core/services/notifications.service';
import { ConfigService } from '../../core/services/config.service';
import { AuthService } from '../../core/services/auth.service';
import { finalize, first } from 'rxjs/operators';
import { RecaptchaComponent } from 'ng-recaptcha';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'arpa-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  @ViewChild('captchaRef') reCaptcha: RecaptchaComponent;
  registerRequest = false;
  registerFormGroup: FormGroup;
  hide = true;
  siteKey: string;
  genderSelectValue: any;

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private configService: ConfigService,
              private notificationsService: NotificationsService,
              private loadingService: LoadingService,
  ) {

    this.siteKey = configService.getEnv('captcha').key;

    this.registerFormGroup = formBuilder.group({
      userName: [null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(256),
        ],
      ],
      givenName: [null,
        [
          Validators.required,
          Validators.maxLength(50),
        ],
      ],
      surname: [null,
        [
          Validators.required,
          Validators.maxLength(50),
        ],
      ],
      email: [null,
        [
          Validators.required,
          Validators.pattern(configService.getEnv('validation').email),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(configService.getEnv('validation').password),
        ],
      ],
      confirmPassword: [
        null,
        [
          Validators.required,
          this.comparePasswords,
        ],
      ],
      privacyPolicy: [
        null,
        [
          Validators.required,
        ],
      ],
    });
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

  onSubmit(): void {
    this.loadingService.loadingOn();
    this.reCaptcha.execute();
  }

  onError(): void {
    this.notificationsService.error('error.SOMETHING_WENT_WRONG');
  }

  submit(): void {
    this.authService
      .register(Object.assign({}, this.registerFormGroup.value))
      .pipe(
        first(),
        finalize(() => {
          this.loadingService.reset();
        }))
      .subscribe(() => {
        this.notificationsService.info('register.THANKS');
        this.router.navigate(['activation']);
      }, error => {
        if (error.status < 500 && error.errors) {
          Object.keys(error.errors).forEach(prop => {
            const formProp = prop[0].toLowerCase() + prop.slice(1);
            const formControl = this.registerFormGroup.get(formProp);
            if (formControl) {
              formControl.setErrors({
                resultError: error.errors[prop],
              });
            }
          });
        } else {
          this.router.navigate(['regError']);
        }
      });
  }

  onChange(): void {
    this.registerRequest = false;
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

}
