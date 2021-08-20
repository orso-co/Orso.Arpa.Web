import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';

@Pipe({
  name: 'selectValue',
  pure: false,
})
export class SelectValuePipe implements OnDestroy, PipeTransform {

  private subscription: Subscription;
  private currentValue: any;

  constructor(private _ref: ChangeDetectorRef) {}

  transform(id: any, values: Observable<SelectItem[]>): any {
    if (values) {
      this.subscription = values.subscribe({
        next: (collection: any): void => {
          if (Array.isArray(collection)) {
            collection.forEach((entity) => {
              if (entity.value && entity.value === id) {
                this.currentValue = entity.label;
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
