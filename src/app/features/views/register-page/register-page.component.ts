import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, first, map } from 'rxjs/operators';
import {
  SelectValueService,
  ConfigService,
  LoadingService,
  NotificationsService,
  AuthService,
  ClubService,
  FormErrorService,
} from '@arpa/services';
import { Observable } from 'rxjs';
@Component({
  selector: 'arpa-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  // @ViewChild('captchaRef') reCaptcha: RecaptchaComponent;
  validPassword: boolean = false;
  registerRequest: boolean = false;
  registerFormGroup: UntypedFormGroup;
  hide: boolean = true;
  // siteKey: string;
  genderSelectValue: any;
  showAboutMe = false;
  clubName$: Observable<string>;

  constructor(
    formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private loadingService: LoadingService,
    private selectValueService: SelectValueService,
    configService: ConfigService,
    clubService: ClubService,
    private formErrorService: FormErrorService
  ) {
    // this.siteKey = configService.getEnv('captcha').key;

    this.genderSelectValue = this.selectValueService.getPersonGenders();
    this.clubName$ = clubService.getClubData().pipe(map((club) => club?.name ?? ''));

    this.registerFormGroup = formBuilder.group({
      genderId: [null, [Validators.required]],
      userName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
      givenName: [null, [Validators.required, Validators.maxLength(50)]],
      surname: [null, [Validators.required, Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.pattern(configService.getEnv('validation').email)]],
      password: [null, [Validators.required, Validators.pattern(configService.getEnv('validation').password)]],
      confirmPassword: [null, [Validators.required, this.comparePasswords]],
      privacyPolicy: [null, [Validators.required]],
      isNew: [false],
      aboutMe: [null],
    });

    this.registerFormGroup.get('isNew')?.valueChanges.subscribe((val) => {
      if (val) {
        this.registerFormGroup.controls['aboutMe'].setValidators([Validators.required]);
      } else {
        this.registerFormGroup.controls['aboutMe'].clearValidators();
      }
      this.showAboutMe = val;
      this.registerFormGroup.controls['aboutMe'].updateValueAndValidity();
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
      .register({ ...this.registerFormGroup.value })
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
            this.formErrorService.handleError(this.registerFormGroup, error);
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
