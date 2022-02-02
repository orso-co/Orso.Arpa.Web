import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

/**
 * Displays the date and time according to the current language's conventions
 * If additional languages are added, their locale data needs to imported in the localized date pipe module
 * Default timezone is German time
 */
@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService, private datePipe: DatePipe) {}

  transform(value: any, pattern: string = 'mediumDate', timezone: string = 'de'): any {
    try {
      return this.datePipe.transform(value, pattern, timezone, this.translateService.currentLang);
    } catch (e) {
      return this.datePipe.transform(value, pattern, timezone, 'en-GB');
    }
  }

}

