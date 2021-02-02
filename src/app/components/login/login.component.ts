import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, TimeoutError  } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  errorMsg = '';
  loginRequest = false;

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private translate: TranslateService

  ) {
    this.loginFormGroup = formBuilder.group({
      userName: [null,
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

  submit(): void {
    this.loginRequest = true;
    this.authService
      .login(Object.assign({}, this.loginFormGroup.value))
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
        this.router.navigate(['performer']);
      });
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }

}



