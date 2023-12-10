import { Component, Input, OnInit } from '@angular/core';
import { AddressDto, PersonDto } from '@arpa/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MeService, NotificationsService, SelectValueService } from '@arpa/services';
import { SelectItem } from 'primeng/api';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { cloneDeep } from 'lodash-es';
import { first } from 'rxjs/operators';

@Component({
  selector: 'arpa-user-addressdata',
  templateUrl: './user-addressdata.component.html',
  styleUrls: ['./user-addressdata.component.scss'],
})
export class UserAddressdataComponent implements OnInit {
  public form: UntypedFormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([]);
  private _tableData: Array<any>;
  public typeOptions$: Observable<SelectItem[]>;
  @Input() addresses: AddressDto[] = [];
  @Input() person: PersonDto | null;

  columns: ColumnDefinition<AddressDto>[] = [
    { label: 'profile.address.ADDRESS1', property: 'address1', type: 'text' },
    { label: 'profile.address.ADDRESS2', property: 'address2', type: 'text' },
    { label: 'profile.address.CITY', property: 'city', type: 'text' },
    { label: 'profile.address.ZIP', property: 'zip', type: 'text' },
    { label: 'profile.address.COUNTRY', property: 'country', type: 'text' },
    { label: 'profile.address.STATE', property: 'state', type: 'text' },
    { label: 'profile.address.ADDRESS_TYPE', property: 'addressType', type: 'state', stateTable: 'Address', stateProperty: 'Type' },
    { label: 'profile.address.COMMENT_INNER', property: 'commentInner', type: 'text', show: true },
  ];
  constructor(
    private formBuilder: UntypedFormBuilder,
    private selectValueService: SelectValueService,
    private meService: MeService,
    private notificationsService: NotificationsService
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      address1: [null, [Validators.required]],
      address2: [null],
      city: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      addressType: [null],
      commentInner: [null, [Validators.maxLength(500)]],
      typeId: [null],
    });
  }
  ngOnInit() {
    this._tableData = this.addresses && this.addresses.length ? cloneDeep(this.addresses) : [];
    this.tableData.next(this._tableData);
    this.typeOptions$ = this.selectValueService.getAddressTypes();
  }
  onSubmit() {
    const { id, address1, address2, city, country, state, zip, commentInner, typeId } = this.form.getRawValue();
    if (id) {
      this.meService
        .updateAddress(id, { address1, address2, city, state, zip, country, commentInner, typeId })
        .pipe(first())
        .subscribe((_) => {
          const index = this._tableData.findIndex((el) => el.id === id);
          this._tableData[index] = { ...this._tableData[index], commentInner, address1, address2, city, state, zip, country, typeId };
          this.tableData.next(this._tableData);
          this.notificationsService.success('ADDRESS_UPDATED', 'address');
          this.form.reset({});
        });
    } else {
      this.meService
        .addAddress(this.person?.id, { address1, address2, city, state, zip, country, typeId, commentInner })
        .pipe(first())
        .subscribe((result) => {
          this._tableData.push(result);
          this.tableData.next(this._tableData);
          this.notificationsService.success('ADDRESS_CREATED', 'address');
          this.form.reset({});
        });
    }
  }
  remove(address: AddressDto): void {
    this.meService
      .deleteAddress(address.id, this.person?.id)
      .pipe(first())
      .subscribe(() => {
        this.tableData.next(this._tableData.filter((e) => e.id != address.id));
        this.notificationsService.success('ADDRESS_DELETED', 'address');
      });
  }

  update(address: AddressDto) {
    this.form.reset({
      id: address.id,
      adress1: address.address1,
      adress2: address.address2,
      city: address.city,
      zip: address.zip,
      country: address.country,
      typeId: address.type,
    });
  }

  onCancel(): void {
    this.form.reset({});
  }
}
