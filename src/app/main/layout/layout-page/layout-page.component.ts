import { Component, OnInit } from '@angular/core';
import { RouteTitleService } from '../../../core/services/route-title.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'arpa-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
})
export class LayoutPageComponent {

  pageTitle: Observable<string | any >;

  constructor(private titleService: RouteTitleService) {
    this.pageTitle = titleService.titleEvent;
  }
}
