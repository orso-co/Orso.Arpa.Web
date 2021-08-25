import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SectionDto } from '../../../model/sectionDto';

@Pipe({
  name: 'section',
})
export class SectionPipe implements OnDestroy, PipeTransform {

  private subscription: Subscription;
  private currentValue: any;

  constructor(private _ref: ChangeDetectorRef) {
  }

  transform(id: any, sections: Observable<SectionDto[]>): any {
    if (sections) {
      this.subscription = sections.subscribe({
        next: (collection: any): void => {
          if (Array.isArray(collection)) {
            collection.forEach((entity) => {
              if (entity.id && entity.id === id) {
                this.currentValue = entity.name;
                this._ref.markForCheck();
              }
            });
          }
        },
        error: (e): void => {
          throw e;
        },
      });
    }
    return this.currentValue;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
