import { Component } from '@angular/core';
import { NewsService } from '../../../../@arpa/services/news.service';
import { Observable, Subscription, of } from 'rxjs';
import { NewsDto } from '@arpa/models';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'arpa-news-widget',
  templateUrl: './news-widget.component.html',
  styleUrls: ['./news-widget.component.scss'],
})
export class NewsWidgetComponent {
  pageSize = 4;
  selectedNewsItem: NewsDto | undefined;
  loadedNews: NewsDto[] = [];

  constructor(private newsService: NewsService) {}

  loadData(event: LazyLoadEvent): void {
    this.newsService.getAllNews(event.rows!, event.first!).subscribe((news) => {
      this.loadedNews.splice(event.first!, event.rows!, ...news);
      this.loadedNews = [...this.loadedNews];
    });
  }

  showOverlay(event: any, op: any, newsItem: NewsDto) {
    this.selectedNewsItem = newsItem;
    op.show(event, event.target);
  }
}
