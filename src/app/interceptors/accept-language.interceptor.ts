import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class AcceptLanguageInterceptor implements HttpInterceptor {

  constructor(private translate: TranslateService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        'Accept-Language': this.translate.currentLang + ';q=0.9,en-US,en;q=0.8'
      }
    });
    return next.handle(request);
  }
}
