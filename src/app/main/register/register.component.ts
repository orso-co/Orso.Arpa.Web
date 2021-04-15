import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from '../../core/services/notifications.service';
import { ConfigService } from '../../core/services/config.service';
import { AuthService } from '../../core/services/auth.service';
import { first } from 'rxjs/operators';
import { RecaptchaComponent } from 'ng-recaptcha';

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

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private configService: ConfigService,
              private notificationsService: NotificationsService,
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
      privacyPolicy: [
        null,
        [
          Validators.required,
        ],
      ],
    });
  }

  onSubmit(): void {
    this.reCaptcha.execute();
  }

  onError(): void {
    this.notificationsService.error('error.SOMETHING_WENT_WRONG');
  }

  submit(): void {
    this.authService
      .register(Object.assign({}, this.registerFormGroup.value))
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.info('register.THANKS');
        this.router.navigate(['login']);
      }, error => {
        if (error.status === 400 && error.errors) {
          Object.keys(error.errors).forEach(prop => {
            const formProp = prop[0].toLowerCase() + prop.slice(1);
            const formControl = this.registerFormGroup.get(formProp);
            if (formControl) {
              formControl.setErrors({
                resultError: error.errors[formProp],
              });
            }
          });
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
