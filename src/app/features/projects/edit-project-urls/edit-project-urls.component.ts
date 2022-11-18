import { OverlayPanel } from 'primeng/overlaypanel';
import { BehaviorSubject, Observable } from 'rxjs';
import { ColumnDefinition } from './../../../../@arpa/components/table/table.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlDto, RoleDto, UrlRoleDto } from '@arpa/models';
import { ProjectService, NotificationsService, RoleService } from '@arpa/services';
import { first, map } from 'rxjs/operators';
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
  roles$: Observable<RoleDto[]>;
  selectedUrlRoles: string[] = [];

  columns: ColumnDefinition<UrlDto>[] = [
    { label: 'projects.URL', property: 'href', type: 'template', template: 'linkTemplate' },
    { label: 'projects.DESCRIPTION', property: 'anchorText', type: 'text' },
    { label: 'projects.ROLES', property: 'urlRoles', type: 'template', template: 'roleTemplate' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private notificationsService: NotificationsService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roles$ = this.roleService.getRoles().pipe(map((r) => r.filter((role) => role.roleName !== 'Admin')));
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
          this.notificationsService.success('URL_MODIFIED', 'projects');
          this.form.reset({});
        });
    } else {
      this.projectService
        .addUrl(this.projectId, { href, anchorText })
        .pipe(first())
        .subscribe((result) => {
          this._tableData.push(result);
          this.tableData.next(this._tableData);
          this.notificationsService.success('URL_ADDED', 'projects');
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
        this.notificationsService.success('URL_REMOVED', 'projects');
      });
  }

  update(url: UrlDto) {
    this.form.reset({
      anchorText: url.anchorText,
      href: url.href,
      id: url.id,
    });
  }

  onRoleSelectionChange(event: { itemValue: string; value: string[] }, url: UrlDto, overlayPanel: OverlayPanel) {
    overlayPanel.hide();
    if (event.value.includes(event.itemValue)) {
      this.projectService
        .addRoleToUrl(url.id!, event.itemValue)
        .pipe(first())
        .subscribe((updatedUrl) => {
          const index = this._tableData.findIndex((el) => el.id === url.id);
          this._tableData[index] = { ...updatedUrl, urlRoles: updatedUrl.roles.map((r: any) => ({ role: r })) };
          this.tableData.next(this._tableData);
          this.notificationsService.success('ROLE_ADDED', 'projects');
        });
    } else {
      this.projectService
        .removeRoleFromUrl(url.id!, event.itemValue)
        .pipe(first())
        .subscribe(() => {
          const index = this._tableData.findIndex((el) => el.id === url.id);
          this._tableData[index].urlRoles = this._tableData[index].urlRoles.filter((r: UrlRoleDto) => r.role.id !== event.itemValue);
          this.tableData.next(this._tableData);
          this.notificationsService.success('ROLE_REMOVED', 'projects');
        });
    }
    this.selectedUrlRoles = [];
  }

  getRoles(urlRoles: UrlRoleDto[]): RoleDto[] {
    return urlRoles.map((r) => r.role);
  }

  toggleOverlay(event: any, overlay: OverlayPanel, url: UrlDto) {
    this.selectedUrlRoles = url.urlRoles ? url.urlRoles.map((ur) => ur.role.id) : [];
    overlay.toggle(event);
  }

  onCancel() {
    this.form.reset({});
  }
}
