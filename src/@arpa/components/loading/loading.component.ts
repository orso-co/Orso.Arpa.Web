import { ChangeDetectorRef, Component } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'arpa-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  loading: boolean;

  constructor(public loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) {
    this.loadingService.loading$.pipe(debounceTime(0)).subscribe((val) => {
      this.loading = val;
    });
  }
}
