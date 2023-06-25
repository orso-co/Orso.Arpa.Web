import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { NewsService } from '../../../../@arpa/services/news.service';
import { Observable, of } from 'rxjs';
import { NewsDto } from '@arpa/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-news-widget',
  templateUrl: './news-widget.component.html',
  styleUrls: ['./news-widget.component.scss'],
})
export class NewsWidgetComponent implements AfterViewInit {
  news$: Observable<NewsDto[]> = of([]);
  totalRecordsCount$: Observable<number> = of(0);

  constructor(private newsService: NewsService, private cdRef: ChangeDetectorRef) {}

  loadData(take: number, skip: number): void {
    const loadResult$ = this.newsService.getAllNews(take, skip);
    this.news$ = loadResult$.pipe(map((result) => result?.news || []));
    this.totalRecordsCount$ = loadResult$.pipe(map((result) => result?.totalRecordsCount || 0));
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
