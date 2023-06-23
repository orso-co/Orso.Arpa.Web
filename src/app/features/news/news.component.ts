import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../@arpa/services/news.service';
import { NotificationsService } from '@arpa/services';
import { NewsDto } from '../../../@arpa/models/newsDto';
@Component({
  selector: 'arpa-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  selectedNews: any | undefined;
  formGroup: FormGroup;

  createdAt: Date | undefined;
  createdBy: string | undefined;
  modifiedAt: Date | undefined;
  modifiedBy: string | undefined;
  show: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    formBuilder: FormBuilder,
    private newsService: NewsService,
    private notificationService: NotificationsService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService
  ) {
    this.formGroup = formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(200)]],
      content: [null, [Validators.required, Validators.maxLength(1000)]],
      url: [null, [Validators.maxLength(1000)]],
      show: [null, [Validators.required, Validators.maxLength(1)]],
    });
  }
  ngOnInit() {
    this.activatedRoute.data
      .pipe(
        first(),
        map((data) => data.news),
        map((news) => news.map((news: NewsDto) => this.addLabelToNews(news)))
      )
      .subscribe((news) => (this.news = news));
    this.createdAt = this.news[0]?.createdAt;
    this.createdBy = this.news[0]?.createdBy;
    this.modifiedAt = this.news[0]?.modifiedAt;
    this.modifiedBy = this.news[0]?.modifiedBy;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const value = { ...this.formGroup.value };
    if (this.selectedNews) {
      const id = this.selectedNews.id!;
      this.newsService
        .update(id, value)
        .pipe(first())
        .subscribe(() => {
          this.notificationService.success('NEWS_UPDATED', 'news');
          const index = this.news.findIndex((news) => news.id === id);
          this.news[index] = { ...this.selectedNews, ...this.addLabelToNews(value) };
          this.resetForm();
        });
    } else {
      this.newsService
        .create(value)
        .pipe(first())
        .subscribe((result) => {
          this.notificationService.success('NEWS_CREATED', 'news');
          this.resetForm();
          this.news = [...this.news, { ...this.addLabelToNews(result) }];
        });
    }
  }

  delete(event: any) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: this.translate.instant('news.DELETE_CONFIRM'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('YES'),
      rejectLabel: this.translate.instant('NO'),
      accept: () => {
        this.deleteNews();
      },
    });
  }

  deleteNews() {
    this.newsService
      .delete(this.selectedNews.id)
      .pipe(first())
      .subscribe(() => {
        this.notificationService.success('NEWS_DELETED', 'news');
        const index = this.news.findIndex((news) => news.id === this.selectedNews.id);
        this.news.splice(index, 1);
        this.resetForm();
      });
  }

  onSelectionChange(event: { value: any }) {
    this.formGroup.patchValue({
      ...event.value,
    });
  }

  resetForm() {
    this.formGroup.reset({});
    this.selectedNews = undefined;
  }

  private addLabelToNews(news: NewsDto): any {
    if (!news) {
      return null;
    }
    return { ...news, label: `${news.title}|${news.content}` };
  }
}
