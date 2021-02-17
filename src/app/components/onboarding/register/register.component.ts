import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomRegex } from '../../../utils/CustomRegex';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'arpa-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequest = false;
  errorMsg = '';

  performerRoles: string[] = [];
  divisions: any = {performer: false, volunteer: false, visitor: false};

  registerFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder,
              private authService: AuthService,
              private translate: TranslateService,
              private router: Router) {

    this.registerFormGroup = formBuilder.group({
      userName: [null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(256),
        ]
      ],
      givenName: [null,
        [
          Validators.required,
          Validators.maxLength(50),
        ]
      ],
      surname: [null,
        [
          Validators.required,
          Validators.maxLength(50),
        ]
      ],
      email: [null,
        [
          Validators.required,
          Validators.pattern(CustomRegex.EMAIL),
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(CustomRegex.PASSWORD)
        ],
      ],
      division: [[]],
      performerRole: [[]],
      privacyPolicy: [
        null,
        [
          Validators.required,
        ]
      ],
    });
  }

  ngOnInit(): void {
  }

  submit(): void {

    for (const k in this.divisions) { if (this.divisions[k]) {this.registerFormGroup.value.division.push(k); } }

    this.registerRequest = true;
    this.authService
      .register(Object.assign({}, this.registerFormGroup.value))
      .pipe(
        catchError((error) => {
          this.registerRequest = false;

          if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
              this.errorMsg = this.translate.instant('CONNECTIONERROR');
            } else {
              if (error.error.title) {
                this.errorMsg = error.error.title;
              }
              if (error.error.errors.Password) {
                this.errorMsg = error.error.errors.Password[0];
              }
              if (error.error.errors.Email) {
                this.errorMsg = error.error.errors.Email[0];
              }
              if (error.error.errors.UserName) {
                this.errorMsg = error.error.errors.UserName[0];
              }
            }
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/onboarding/registerConfirmation']);
      });

  }

  onChange(): void {
    this.registerRequest = false;
    this.errorMsg = '';
  }

  goToLogin(): void {
    this.router.navigate(['/onboarding/login']);
  }

}
