import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Label } from 'ng2-charts';
import { selectDashboardFeature } from '../state/state';
import { WidgetStateService } from '../dashboard.component';
import { createSelector, Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ChartWidgetConfig {
  type: ChartType,
  labels: Label[],
  store: string,
  props: string[],
}

@Component({
  selector: 'arpa-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
})
export class ChartWidgetComponent implements OnDestroy {
  public labels: Observable<Label[]>;
  public chartType: ChartType = this.widgetStateService.config.type;
  public data: Observable<any> = this.getSelector(this.widgetStateService.config);
  private translateSubscription: Subscription;

  constructor(private translate: TranslateService,
              private widgetStateService: WidgetStateService,
              private store: Store,
  ) {
    this.translateLabels();
    this.translateSubscription = this.translate.onLangChange.subscribe(() => this.translateLabels());
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }

  private translateLabels() {
    this.labels = this.translate.get(this.widgetStateService.config.labels as string[])
      .pipe(map(result => this.widgetStateService.config.labels.reduce((acc: string[], key: string) => {
          if (result.hasOwnProperty(key)) {
            acc.push(result[key]);
          }
          return acc;
        }, []),
      ));
  }

  /**
   * Build custom selector for dynamic configurations and sort results against prop config.
   */
  private getSelector({ store, props = [] }: ChartWidgetConfig): Observable<unknown> {
    return this.store.select(
      createSelector(selectDashboardFeature,
        (state: Record<string, any>) => props.reduce((acc: any[], key: string) => {
          if (state[store].hasOwnProperty(key)) {
            acc.push(state[store][key]);
          }
          return acc;
        }, []),
      ));
  }
}
