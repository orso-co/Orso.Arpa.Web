import { Component } from '@angular/core';
import { NewsService } from '../../../../@arpa/services/news.service';
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

  openUrl(event: Event, url: string): void {
    event.stopPropagation();
    window.open(url, '_blank');
  }
  showOverlay(event: any, op: any, newsItem: NewsDto) {
    if (this.selectedNewsItem) {
      op.hide();
      this.selectedNewsItem = undefined;
    } else {
      this.selectedNewsItem = newsItem;
      op.show(event, event.target);
    }
  }
}
