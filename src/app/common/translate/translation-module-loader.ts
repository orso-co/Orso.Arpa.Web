import { HttpClient } from '@angular/common/http';
import { Observable, of, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TranslateLoader } from '@ngx-translate/core';

export class TranslationModuleLoader extends TranslateLoader {

  private static LOADED: { [lang: string]: { [module: string]: boolean } } = {};

  constructor(private httpClient: HttpClient, private modules: string[]) {
    super();
  }

  getTranslation(lang: string): Observable<object> {
    const loaded = this.modules.slice().sort((a, b) => a.length - b.length)
      .filter(s => !TranslationModuleLoader.LOADED?.[lang]?.[s]);

    if (!loaded.length) {
      return of({});
    }

    return zip(...loaded.map(s => this.load(lang, s)))
      .pipe(
        map(translates => translates.reduce((acc: any, t, i) => {
          const module = loaded[i].toLowerCase();
          if (!module || module === 'default') {
            return { ...t };
          }
          acc[module] = {
            ...(acc[module] && { ...acc[module] }),
            ...t,
          };
          return acc;
        }, {})),
      );
  }

  private load(lang: string, module: string): Observable<object> {
    return this.httpClient.get(`/assets/i18n/${module.toLowerCase()}/${lang}.json`).pipe(
      tap(() => {
        if (!TranslationModuleLoader.LOADED[lang]) {
          TranslationModuleLoader.LOADED[lang] = {};
        }
        TranslationModuleLoader.LOADED[lang][module] = true;
      }),
    );
  }
}
