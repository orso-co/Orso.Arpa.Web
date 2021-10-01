import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, take, tap } from 'rxjs/operators';

export class ArpaMissingTranslationHandler extends MissingTranslationHandler {
  private translatesLoading: { [lang: string]: Observable<object> } = {};

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
      map(t => service.parser.interpolate(service.parser.getValue(t, params.key), params.interpolateParams)),
      catchError(() => of(params.key)),
    );
  }
}
