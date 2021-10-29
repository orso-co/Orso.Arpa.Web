import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WidgetStateService } from '../dashboard.component';
import { of, Subscription } from 'rxjs';


export interface WidgetConfig {
  title: string;
  showReload: boolean;
}

export enum WidgetEvents {
  RELOAD
}

@Component({
  selector: 'arpa-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit, OnDestroy {

  @Input()
  public title: string = 'Widget';
  public config: WidgetConfig = this.widgetStateService.config;
  public loading: boolean = true;
  private loadingSubscription: Subscription;

  constructor(private widgetStateService: WidgetStateService) {
    this.loadingSubscription = this.widgetStateService.loading.subscribe(state => {
      this.loading = state;
    });
  }

  ngOnInit() {
    this.widgetStateService.showLoaderUntilCompleted(of());
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  triggerReload($event: Event) {
    this.widgetStateService.events.emit(WidgetEvents.RELOAD);
  }
}
