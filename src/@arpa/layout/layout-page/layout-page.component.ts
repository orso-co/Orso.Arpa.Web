import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteTitleService } from '@arpa/services';

@Component({
  selector: 'arpa-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
})
export class LayoutPageComponent {
  pageTitle: Observable<string | any>;

  constructor(private titleService: RouteTitleService) {
    this.pageTitle = titleService.titleEvent;
  }
}
