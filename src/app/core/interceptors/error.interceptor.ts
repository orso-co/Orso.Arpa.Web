import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private notificationsService: NotificationsService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        const errorMessages = [];
        if (error && error.status > 402) {
          switch (error.status) {
            case 0:
              this.notificationsService.error('error.CONNECTION_ERROR');
              break;
            case 404:
              this.notificationsService.error('error.ROUTE_NOT_FOUND');
              this.router.navigate(['/not-found']);
              break;
            default:
              if (error.error.errors) {
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    errorMessages.push(error.error.errors[key][0]);
                    this.notificationsService.warning(errorMessages.slice(-1)[0]);
                  }
                }
                if (errorMessages.length === 0) {
                  this.notificationsService.warning(error.error.title);
                  errorMessages.push(error.error.title);
                }
              }
              if ((error.status === 401) && (errorMessages.length === 0)) {
                this.notificationsService.error('warning.LOGIN_FIRST');
                this.router.navigate(['/']);
              }
              break;
          }
        }
        return throwError(errorMessages);
      }),
    );
  }
}
