import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localePt from '@angular/common/locales/pt';

import { LocalizedDatePipe } from './localized-date.pipe';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeDe, 'de');
registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [
    LocalizedDatePipe,
  ],
  exports: [
    LocalizedDatePipe,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'fr'},
    { provide: LOCALE_ID, useValue: 'pt'},
    { provide: LOCALE_ID, useValue: 'de'},
  ]
})
export class LocalizedDateModule { }
