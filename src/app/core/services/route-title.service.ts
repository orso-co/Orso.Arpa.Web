import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteTitleService {

  public title: string;
  public titleEvent = new BehaviorSubject<string>('');

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.titleEvent.next(this.title && this.title.length > 0 ? this.translate.instant(this.title):'');
    });
  }

  public setTitle(title: string) {
    this.title = title;
    this.titleEvent.next(this.title && this.title.length > 0 ? this.translate.instant(this.title):'');
  }
}
