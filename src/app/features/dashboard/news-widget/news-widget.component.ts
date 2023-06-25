import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { NewsService } from '../../../../@arpa/services/news.service';
import { Observable, of } from 'rxjs';
import { NewsDto } from '@arpa/models';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'arpa-news-widget',
  templateUrl: './news-widget.component.html',
  styleUrls: ['./news-widget.component.scss'],
})
export class NewsWidgetComponent {
  news$: Observable<NewsDto[]> = of([]);
  totalRecordsCount$: Observable<number> = of(0);
  pageSize = 4;
  selectedNewsItem: NewsDto | undefined;

  constructor(private newsService: NewsService) {}

  loadData(event: LazyLoadEvent): void {
    console.log('load data', event);
    this.news$ = this.newsService.getAllNews(this.pageSize, 0);
  }

  showOverlay(event: any, op: any, newsItem: NewsDto) {
    this.selectedNewsItem = newsItem;
    op.show(event, event.target);
  }
}
