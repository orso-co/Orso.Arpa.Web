import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ToastService } from './../services/toast.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
      private toastrService: ToastrService,
      private toastService: ToastService,
      private router: Router
      ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        const errorMessages = [];
        if (error) {
          switch (error.status) {
            case 0:
              this.toastService.error('errors.CONNECTIONERROR');
              break;

            case 401:
              this.toastService.error('login.LOGIN_FIRST');
              this.router.navigate(['/onboarding/login']);
              break;

            case 403:
              this.toastService.error('errors.FORBIDDEN');
              this.router.navigate(['/forbidden']);
              break;

            case 404:
              this.toastService.error('errors.NOTFOUND');
              this.router.navigate(['/not-found']);
              break;

            default:
                if (error.error.errors) {
                    for (const key in error.error.errors) {
                        if (error.error.errors[key]) {
                            errorMessages.push(error.error.errors[key][0]);
                            this.toastrService.warning(errorMessages.slice(-1)[0]);
                        }
                    }
                    if (errorMessages.length === 0) {
                      this.toastrService.warning(error.error.title);
                      errorMessages.push(error.error.title);
                    }
                }
               break;
          }
        }
        return throwError(errorMessages);
      })
    );
  }
}
