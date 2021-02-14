import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IConfirmEmailDto } from '../../../models/IConfirmEmailDto';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'arpa-emailconfirmation',
  templateUrl: './emailconfirmation.component.html',
  styleUrls: ['./emailconfirmation.component.scss']
})
export class EmailconfirmationComponent implements OnInit {

  errorMsg = '';
  successMsg = false;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private translate: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      const confirmEmail: IConfirmEmailDto = {token: params.token, email: params.email};
      this.authService
      .confirmMail(confirmEmail)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
              this.errorMsg = this.translate.instant('CONNECTIONERROR');
            } else {
              this.errorMsg = this.translate.instant('UNKNOWNERROR');
              if (error.error.errors) {
                if (error.error.errors.Email) { this.errorMsg = error.error.errors.Email; }
                if (error.error.errors.Token) { this.errorMsg = error.error.errors.Token; }
              }
              if (error.error.errorMessage) {
                if (error.error.errorMessage.Errors) { this.errorMsg = error.error.errorMessage.Errors[0]; }
              }
            }
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.successMsg = true;
      });
    });
  }

  goToLogin(): void {
    this.router.navigate(['/onboarding/login']);
  }

}
