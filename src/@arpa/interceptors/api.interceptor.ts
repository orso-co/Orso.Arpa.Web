import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, of, Subject, throwError } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from '../services/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../services/config.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  readonly apiUrlBase: string;
  readonly graphQlUrlBase: string;
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private translate: TranslateService
  ) {
    this.apiUrlBase = this.getFullUri('api');
    this.graphQlUrlBase = this.getFullUri('graphql');
  }

  private getFullUri(key: string): string {
    let { protocol, baseUrl } = this.configService.getEnv(key);
    return `${protocol}://${baseUrl}`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
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
        })
      );
    }
  }

  handleResponseError(error: any, request?: HttpRequest<unknown>, next?: HttpHandler): Observable<any> {
    // catch fake error responses
    if (error.status === 200) {
      return of(EMPTY);
    }

    if (error.status === 400) {
      this.notificationsService.error('error.BAD_REQUEST');
    } else if (next && request && error.status === 401 && !error.url.endsWith('/login')) {
      return this.refreshToken().pipe(
        switchMap(() => {
          if (request) {
            const authenticatedRequest = this.authenticateRequest(request);
            return next.handle(authenticatedRequest);
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
        })
      );
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

  private authenticateRequest(request: HttpRequest<unknown>) {
    const token = this.jwtService.getToken();
    return request.clone({
      withCredentials: true,
      headers: request.headers
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Accept-Language', this.translate.currentLang),
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(this.apiUrlBase) || request.url.startsWith(this.graphQlUrlBase)) {
      const authenticatedRequest = this.authenticateRequest(request);
      return next.handle(authenticatedRequest).pipe(catchError((error: any) => this.handleResponseError(error, request, next)));
    } else {
      return next.handle(request.clone());
    }
  }
}
