import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NotificationsService } from '../services/notifications.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(
    private notificationsService: NotificationsService,
    private loadingService: LoadingService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.loadingService.loadingOn();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationsService.error(error.message);
        return throwError(error);
      }),
      finalize(() => {
        this.loadingService.loadingOff();
      }),
    ) as Observable<HttpEvent<any>>;
  }
}
