import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from '../services/notifications.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  readonly apiUrlBase: string;
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private translate: TranslateService,
  ) {
    const { protocol, baseUrl } = this.configService.getEnv('api');
    this.apiUrlBase = `${protocol}://${baseUrl}`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.authService.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }),
        catchError((error) => {
          this.refreshTokenInProgress = false;
          this.logout();
          return of(error);
        }));
    }
  }

  handleResponseError(error: any, request?: HttpRequest<unknown>, next?: HttpHandler): Observable<any> {
    if (error.status === 400) {
      this.notificationsService.error('error.BAD_REQUEST');
    } else if (next && request && error.status === 401 && !error.url.endsWith('/login')) {
      return this.refreshToken().pipe(
        switchMap(() => {
          if (request) {
            request = request.clone({ setHeaders: this.setAuthHeader(), withCredentials: true });
            return next.handle(request);
          }
          return of(error);
        }),
        catchError((e) => {
          if (e.status !== 401) {
            return this.handleResponseError(e);
          } else {
            this.logout();
          }
          return of(e);
        }));
    } else if (error.status === 403 && !error.url.endsWith('/login')) {
      this.notificationsService.error('error.FORBIDDEN');
      this.authService.logout();
    } else if (error.status === 500) {
      this.router.navigate(['error'], {
        state: {
          error: 500,
          type: 'FatalError',
          message: 'error.FATAL_ERROR',
        },
      });
    } else if (error.status === 503) {
      this.router.navigate(['error'], {
        state: {
          error: 503,
          type: 'Error',
          message: 'error.SERVICE_UNAVAILABLE',
        },
      });
    }

    return throwError(error);
  }

  setAuthHeader() {
    const token = this.jwtService.getToken();
    const headersConfig: Record<string, string> = {
      /* eslint-disable @typescript-eslint/naming-convention */
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': this.translate.currentLang + ';q=0.9,de,de-DE;q=0.8,en,en-GB;q=0.7',
    };
    /* eslint-enable @typescript-eslint/naming-convention */
    if (token) {
      headersConfig.Authorization = `Bearer ${token}`;
    }
    return headersConfig;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(this.apiUrlBase)) {
      request = request.clone({ setHeaders: this.setAuthHeader(), withCredentials: true });
      return next.handle(request).pipe(catchError((error: any) => this.handleResponseError(error, request, next)));
    } else {
      return next.handle(request.clone());
    }
  }
}
