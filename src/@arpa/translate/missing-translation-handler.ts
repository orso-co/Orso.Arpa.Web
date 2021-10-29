import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, take, tap } from 'rxjs/operators';

export class ArpaMissingTranslationHandler extends MissingTranslationHandler {
  private translatesLoading: { [lang: string]: Observable<object> } = {};

  constructor(private modules: string[] = []) {
    super();
  }

  handle(params: MissingTranslationHandlerParams) {
    const service = params.translateService;
    const lang = service.currentLang || service.defaultLang;

    if (!this.translatesLoading[lang]) {
      this.translatesLoading[lang] = service.currentLoader.getTranslation(lang).pipe(
        tap(t => service.setTranslation(lang, t, true)),
        map(() => service.translations[lang]),
        shareReplay(1),
        take(1),
      );
    }

    return this.translatesLoading[lang].pipe(
      map((t: Record<string, any>) => {
        let scope = '';
        if (this.modules.length) {
          for (let i = 0; i < this.modules.length; i++) {
            if (t[this.modules[i]]) {
              scope = this.modules[i] + '.';
              break;
            }
          }
        }
        return service.parser.interpolate(service.parser.getValue(t, `${scope}${params.key}`), params.interpolateParams) || params.key;
      }),
      catchError(() => of(params.key)),
    );
  }
}
