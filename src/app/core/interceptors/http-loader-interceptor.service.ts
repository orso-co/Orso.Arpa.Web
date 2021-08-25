import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.loadingService.loadingOn();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => throwError(error)),
      finalize(() => {
        this.loadingService.loadingOff();
      }),
    ) as Observable<HttpEvent<any>>;
  }
}
