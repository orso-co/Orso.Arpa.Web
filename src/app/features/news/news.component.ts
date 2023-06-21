import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NewsDto } from '../../../@arpa/models/NewsDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../@arpa/services/news.service';
import { NotificationsService } from '@arpa/services';

@Component({
  selector: 'arpa-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  selectedNews: any | undefined;
  formGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    formBuilder: FormBuilder,
    private newsService: NewsService,
    private notificationService: NotificationsService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService
  ) {
    this.formGroup = formBuilder.group({
      newsText: [null, [Validators.required, Validators.maxLength(1000)]],
      url: [null],
      show: [null, [Validators.required, Validators.maxLength(1)]],
    });
  }
  ngOnInit() {
    this.activatedRoute.data.pipe(
      first(),
      map((data) => data.news),
      map((news) => news.map((news: NewsDto) => this.addLabelToNews(news)))
    );
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
      message: this.translate.instant('news.ARE_YOU_SURE'),
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
      address1: event.value.address?.address1,
      address2: event.value.address?.address2,
      zip: event.value.address?.zip,
      city: event.value.address?.city,
      country: event.value.address?.country,
      urbanDistrict: event.value.address?.urbanDistrict,
      state: event.value.address?.state,
      addressCommentInner: event.value.address?.commentInner,
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
    return { ...news, label: `${news.newsText}|${news.createdAt}|${news.createdBy}` };
  }
}
