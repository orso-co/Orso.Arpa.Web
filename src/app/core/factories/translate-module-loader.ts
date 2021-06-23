import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import { catchError, map } from 'rxjs/operators';
import { merge } from 'lodash-es';

export class TranslateModuleLoader implements TranslateLoader {
  constructor(private http: HttpClient, private modules: string[]) {
  }

  /**
   * Fetch i18n resources from multiple prefixed(module) locations and merge the result.
   *
   * @param lang
   */
  getTranslation(lang: string): Observable<any> {
    const requests = this.modules.map(module => {
      const path = `/assets/i18n/${module}/${lang}.json`;
      return this.http.get(path).pipe(catchError(res => {
        // eslint-disable-next-line no-console
        console.error('Something went wrong for the following translation file:', path);
        // eslint-disable-next-line no-console
        console.error(res.message);
        return of({});
      }));
    });
    return forkJoin(requests).pipe(map(response => response.reduce((prev, next) => merge(prev, next))));
  }
}
