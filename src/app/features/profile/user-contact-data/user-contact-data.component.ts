import { SelectValueService, MeService } from '@arpa/services';
import { ContactDetailDto, ContactDetailKey } from '@arpa/models';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/@arpa/services/notifications.service';
import { ColumnDefinition } from 'src/@arpa/components/table/table.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { first, map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'arpa-user-contact-data',
  templateUrl: './user-contact-data.component.html',
  styleUrls: ['./user-contact-data.component.scss'],
})
export class UserContactDataComponent implements OnInit {
  form: FormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([]);
  private _tableData: Array<any>;
  @Input() contactDetails: ContactDetailDto[] = [];
  public typeOptions$: Observable<SelectItem[]>;
  public ContactDetailKey = ContactDetailKey;

  columns: ColumnDefinition<ContactDetailDto>[] = [
    { label: '#', property: 'key', type: 'template', template: 'keyTemplate' },
    { label: 'contact.VALUE', property: 'value', type: 'text' },
    { label: 'contact.PREFERENCE', property: 'preference', type: 'rating', show: true },
    { label: 'contact.TYPE', property: 'typeId', type: 'state', stateTable: 'ContactDetail', stateProperty: 'Type' },
    { label: 'contact.COMMENT_INNER', property: 'commentInner', type: 'text', show: true },
    { label: 'contact.COMMENT_TEAM', property: 'commentTeam', type: 'text', show: true },
  ];

  keyOptions = [
    { icon: 'pi pi-envelope', value: ContactDetailKey.E_MAIL },
    { icon: 'pi pi-phone', value: ContactDetailKey.PHONE_NUMBER },
    { icon: 'pi pi-link', value: ContactDetailKey.URL },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private meService: MeService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService
  ) {
    this.form = this.formBuilder.group({
      key: [null, [Validators.required]],
      value: [null, [Validators.required, Validators.maxLength(1000)]],
      typeId: [null],
      commentInner: [null, [Validators.maxLength(500)]],
      preference: [null],
      id: [null],
    });
  }

  ngOnInit() {
    this._tableData = this.contactDetails && this.contactDetails.length ? cloneDeep(this.contactDetails) : [];
    this.tableData.next(this._tableData);
    this.typeOptions$ = this.selectValueService.getContactDetailTypes();
  }

  onSubmit() {
    const { id, key, value, typeId, commentInner, preference } = this.form.getRawValue();
    if (id) {
      this.meService
        .updateContactDetail(id, { key, value, typeId, commentInner, preference: preference || 0 })
        .pipe(first())
        .subscribe((_) => {
          const index = this._tableData.findIndex((el) => el.id === id);
          this._tableData[index] = { ...this._tableData[index], key, value, typeId, commentInner, preference };
          this.tableData.next(this._tableData);
          this.notificationsService.success('CONTACT_DETAIL_MODIFIED', 'contact');
          this.form.reset({});
        });
    } else {
      this.meService
        .addContactDetail({ key, value, typeId, commentInner, preference: preference || 0 })
        .pipe(first())
        .subscribe((result) => {
          this._tableData.push(result);
          this.tableData.next(this._tableData);
          this.notificationsService.success('CONTACT_DETAIL_ADDED', 'contact');
          this.form.reset({});
        });
    }
  }

  remove(contactDetail: ContactDetailDto): void {
    if (typeof contactDetail.id === 'string') {
      this.meService
        .deleteContactDetail(contactDetail.id)
        .pipe(first())
        .subscribe(() => {
          this._tableData = this._tableData.filter((e) => e.id != contactDetail.id);
          this.tableData.next(this._tableData);
          this.notificationsService.success('CONTACT_DETAIL_REMOVED', 'contact');
        });
    }
  }

  update(contactDetail: ContactDetailDto) {
    this.form.reset({
      id: contactDetail.id,
      key: contactDetail.key,
      typeId: contactDetail.typeId,
      commentInner: contactDetail.commentInner,
      preference: contactDetail.preference,
      value: contactDetail.value,
    });
  }

  onCancel(): void {
    this.form.reset({});
  }
}
