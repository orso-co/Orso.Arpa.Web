import { PersonService } from './../../persons/services/person.service';
import { SelectValueService } from './../../../shared/services/select-value.service';
import { ContactDetailDto } from './../../../../@arpa/models/contactDetailDto';
import { MeService } from './../../../shared/services/me.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/@arpa/services/notifications.service';
import { ColumnDefinition } from 'src/@arpa/components/table/table.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { first, map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { PersonDto } from 'src/@arpa/models/personDto';

@Component({
  selector: 'arpa-person-contactdata',
  templateUrl: './person-contactdata.component.html',
  styleUrls: ['./person-contactdata.component.scss'],
})
export class PersonContactdataComponent implements OnInit {
  public form: FormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([]);
  private _tableData: Array<any>;
  @Input() contactDetails: ContactDetailDto[] = [];
  @Input() person: PersonDto | null;

  public typeOptions$: Observable<SelectItem[]>;

  columns: ColumnDefinition<ContactDetailDto>[] = [
    { label: '#', property: 'key', type: 'template', template: 'keyTemplate' },
    { label: 'persons.contact.VALUE', property: 'value', type: 'text' },
    { label: 'persons.contact.PREFERENCE', property: 'preference', type: 'rating', show: true },
    { label: 'persons.contact.TYPE', property: 'typeId', type: 'state', stateTable: 'ContactDetail', stateProperty: 'Type' },
    { label: 'persons.contact.COMMENT_INNER', property: 'commentInner', type: 'text', show: false },
    { label: 'persons.contact.COMMENT_TEAM', property: 'commentTeam', type: 'text', show: false },
  ];

  keyOptions = [
    { icon: 'pi pi-envelope', value: 1 },
    { icon: 'pi pi-phone', value: 2 },
    { icon: 'pi pi-link', value: 3 },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService
  ) {
    this.form = this.formBuilder.group({
      key: [null, [Validators.required]],
      value: [null, [Validators.required, Validators.maxLength(1000)]],
      typeId: [null],
      commentInner: [null, [Validators.maxLength(500)]],
      commentTeam: [null, [Validators.maxLength(500)]],
      preference: [null],
      id: [null],
    });
  }

  ngOnInit() {
    this._tableData = this.contactDetails && this.contactDetails.length ? cloneDeep(this.contactDetails) : [];
    this.tableData.next(this._tableData);
    this.typeOptions$ = this.selectValueService
      .load('ContactDetail', 'Type')
      .pipe(map(() => this.selectValueService.get('ContactDetail', 'Type')));
  }

  onSubmit() {
    if (this.person){
    const { id, key, value, typeId, commentInner, preference } = this.form.getRawValue();
    if (id) {
      this.personService
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
      this.personService
        .addContactDetail(this.person.id, { id, key, value, typeId, commentInner, preference: preference || 0 })
        .pipe(first())
        .subscribe((result) => {
          this._tableData.push(result);
          this.tableData.next(this._tableData);
          this.notificationsService.success('CONTACT_DETAIL_ADDED', 'contact');
          this.form.reset({});
        });
    }
  }
}

  remove(contactDetail: ContactDetailDto): void {
    this.personService
      .deleteContactDetail(contactDetail.id)
      .pipe(first())
      .subscribe(() => {
        this._tableData = this._tableData.filter((e) => e.id != contactDetail.id);
        this.tableData.next(this._tableData);
        this.notificationsService.success('CONTACT_DETAIL_REMOVED', 'contact');
      });
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
