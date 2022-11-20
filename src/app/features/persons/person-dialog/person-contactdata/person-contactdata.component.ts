import { SelectValueService, NotificationsService } from '@arpa/services';
import { ContactDetailDto, PersonDto } from '@arpa/models';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDefinition } from 'src/@arpa/components/table/table.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'arpa-person-contactdata',
  templateUrl: './person-contactdata.component.html',
  styleUrls: ['./person-contactdata.component.scss'],
})
export class PersonContactdataComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([]);
  private _tableData: Array<any>;
  @Input() person: PersonDto | null;

  public typeOptions$: Observable<SelectItem[]>;

  columns: ColumnDefinition<ContactDetailDto>[] = [
    // { label: '#', property: 'key', type: 'template', template: 'keyTemplate' },
    { label: 'persons.contact.VALUE', property: 'value', type: 'text' },
    { label: 'persons.contact.PREFERENCE', property: 'preference', type: 'rating', show: true },
    { label: 'persons.contact.TYPE', property: 'typeId', type: 'state', stateTable: 'ContactDetail', stateProperty: 'Type'},
    { label: 'persons.contact.COMMENT_INNER', property: 'commentInner', type: 'text', show: true },
    { label: 'persons.contact.COMMENT_TEAM', property: 'commentTeam', type: 'text', show: true },
  ];

  keyOptions = [
    { icon: 'pi pi-envelope', value: 1 },
    { icon: 'pi pi-phone', value: 2 },
    { icon: 'pi pi-link', value: 3 },
  ];
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService,
  ) {
    this.form = this.formBuilder.group({
      key: [null, [Validators.required]],
      value: [null, [Validators.required, Validators.maxLength(1000)]],
      typeId: [null],
      commentTeam: [null, [Validators.maxLength(500)]],
      preference: [null],
      id: [null],
    });
  }

  ngOnInit() {
    if (this.person) {
      this.person.contactDetails = this.person.contactDetails || [];
      this._tableData = this.person.contactDetails;
      this.tableData.next(this._tableData);
      this.subscription = this.tableData.subscribe(d => this.person!.contactDetails = d);
    }
    this.typeOptions$ = this.selectValueService
      .load('ContactDetail', 'Type')
      .pipe(map(() => this.selectValueService.get('ContactDetail', 'Type')));
  }

  onSubmit() {
    if (this.person) {
      const { id, key, value, typeId, commentTeam, preference } = this.form.getRawValue();
      if (id) {
        this.contactService
          .updateContactDetail(this.person?.id, id, { key, value, typeId, commentTeam, preference: preference || 0 })
          .pipe(first())
          .subscribe((_) => {
            const index = this._tableData.findIndex((el) => el.id === id);
            this._tableData[index] = { ...this._tableData[index], key, value, typeId, commentTeam, preference };
            this.tableData.next(this._tableData);
            this.notificationsService.success('CONTACT_DETAIL_MODIFIED', 'person-dialog');
            this.form.reset({});
          });
      } else {
        this.contactService
          .addContactDetail(this.person.id, { key, value, typeId, commentTeam, preference: preference || 0 })
          .pipe(first())
          .subscribe((result) => {
            this._tableData.push(result);
            this.tableData.next(this._tableData);
            this.notificationsService.success('CONTACT_DETAIL_ADDED', 'person-dialog');
            this.form.reset({});
          });
      }
    }
  }

  remove(contactDetails: ContactDetailDto): void {
    if (typeof contactDetails.id === 'string') {
      this.contactService
        .deleteContactDetail(contactDetails.id, this.person?.id )
        .pipe(first())
        .subscribe(() => {
          this._tableData = this._tableData.filter(e => e.id !== contactDetails.id);
          this.tableData.next(this._tableData);
          this.notificationsService.success('CONTACT_DETAIL_REMOVED', 'person-dialog');
        });
    }
  }


  update(contactDetails: ContactDetailDto) {
    this.form.reset({
      id: contactDetails.id,
      key: contactDetails.key,
      typeId: contactDetails.typeId,
      commentInner: contactDetails.commentInner,
      commentTeam: contactDetails.commentTeam,
      preference: contactDetails.preference,
      value: contactDetails.value,
    });
  }

  onCancel(): void {
    this.form.reset({});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
