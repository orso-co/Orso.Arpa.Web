import { BehaviorSubject } from 'rxjs';
import { ColumnDefinition } from './../../../../@arpa/components/table/table.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlDto } from 'src/@arpa/models/urlDto';
import { ProjectService } from 'src/app/shared/services/project.service';
import { first } from 'rxjs/operators';
import { NotificationsService } from 'src/@arpa/services/notifications.service';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'arpa-edit-project-urls',
  templateUrl: './edit-project-urls.component.html',
  styleUrls: ['./edit-project-urls.component.scss'],
})
export class EditProjectUrlsComponent implements OnInit {
  @Input() urls: UrlDto[];
  @Input() projectId: string;

  form: FormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([]);
  private _tableData: Array<any>;

  columns: ColumnDefinition<UrlDto>[] = [
    { label: 'Link', property: 'href', type: 'text' },
    { label: 'Bezeichnung', property: 'anchorText', type: 'text' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      href: [null, [Validators.required, Validators.maxLength(1000)]],
      anchorText: [null, [Validators.maxLength(1000)]],
      id: [null],
    });
    this._tableData = this.urls && this.urls.length ? cloneDeep(this.urls) : [];
    this.tableData.next(this._tableData);
  }

  onSubmit() {
    const { id, href, anchorText } = this.form.getRawValue();
    if (id) {
      this.projectService
        .modifyUrl(id, { href, anchorText })
        .pipe(first())
        .subscribe((_) => {
          const index = this._tableData.findIndex((el) => el.id === id);
          this._tableData[index].href = href;
          this._tableData[index].anchorText = anchorText;
          this.tableData.next(this._tableData);
          this.notificationsService.success('URL_MODIFIED', 'project-dialog');
          this.form.reset({});
        });
    } else {
      this.projectService
        .addUrl(this.projectId, { href, anchorText })
        .pipe(first())
        .subscribe((result) => {
          this._tableData.push(result);
          this.tableData.next(this._tableData);
          this.notificationsService.success('URL_ADDED', 'project-dialog');
          this.form.reset({});
        });
    }
  }

  remove(url: UrlDto): void {
    this.projectService
      .removeUrl(url)
      .pipe(first())
      .subscribe(() => {
        this._tableData = this._tableData.filter((e) => e.id != url.id);
        this.tableData.next(this._tableData);
        this.notificationsService.success('URL_REMOVED', 'project-dialog');
      });
  }

  update(url: UrlDto) {
    this.form.reset({
      anchorText: url.anchorText,
      href: url.href,
      id: url.id,
    });
  }
}
