import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arpa-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Input()
  loading: boolean;
  @Input()
  custom: boolean = false;
  private loadingSubscription: Subscription;

  constructor(public loadingService: LoadingService) {
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (!this.custom) {
      this.loadingSubscription = this.loadingService.loading$.pipe(debounceTime(0)).subscribe((val) => {
        this.loading = val;
      });
    }
  }
}
