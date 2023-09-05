import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AddressDto, PersonDto } from '@arpa/models';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { AddressService } from '../services/address.service';
import { NotificationsService, SelectValueService } from '@arpa/services';
import { SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'arpa-person-addresses',
  templateUrl: './person-addresses.component.html',
  styleUrls: ['./person-addresses.component.scss'],
})
export class PersonAddressesComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([]);
  private _tableData: Array<any>;

  @Input() person: PersonDto | null;

  public typeOptions$: Observable<SelectItem[]>;

  columns: ColumnDefinition<AddressDto>[] = [
    { label: 'ZIP', property: 'zip', type: 'text' },
    { label: 'CITY', property: 'city', type: 'text' },
    { label: 'ADDRESS1', property: 'address1', type: 'text' },
    { label: 'ADDRESS2', property: 'address2', type: 'text', show: false },
    { label: 'COUNTRY', property: 'country', type: 'text' },
    { label: 'STATE', property: 'state', type: 'text' },
    { label: 'URBAN_DISTRICT', property: 'urbanDistrict', type: 'text', show: false },
    { label: 'COMMENT', property: 'commentInner', type: 'text', show: false },
    { label: 'TYPE', property: 'typeId', type: 'state', stateTable: 'Address', stateProperty: 'Type' },
  ];
  private subscription: Subscription;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private addressService: AddressService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService
  ) {
    this.form = this.formBuilder.group({
      address1: [null],
      address2: [null],
      zip: [null],
      city: [null, [Validators.required]],
      country: [null, [Validators.required]],
      state: [null],
      urbanDistrict: [null],
      commentInner: [null],
      typeId: [null, [Validators.required]],
      id: [null],
    });
  }

  ngOnInit(): void {
    if (this.person) {
      this.person.addresses = this.person.addresses || [];
      this._tableData = this.person.addresses;
      this.tableData.next(this._tableData);
      this.subscription = this.tableData.subscribe((d) => (this.person!.addresses = d));
    }
    this.typeOptions$ = this.selectValueService.getAddressTypes();
  }

  onSubmit() {
    if (this.person) {
      const { id, address1, address2, zip, city, country, state, urbanDistrict, commentInner, typeId } = this.form.getRawValue();
      if (id) {
        this.addressService
          .updateAddress(this.person?.id, id, { address1, address2, zip, city, country, state, urbanDistrict, commentInner, typeId })
          .pipe(first())
          .subscribe((_) => {
            const index = this._tableData.findIndex((el) => el.id === id);
            this._tableData[index] = {
              ...this._tableData[index],
              address1,
              address2,
              zip,
              city,
              country,
              state,
              urbanDistrict,
              commentInner,
              typeId,
            };
            this.tableData.next(this._tableData);
            this.notificationsService.success('ADDRESS_MODIFIED', 'person-dialog');
            this.form.reset({});
          });
      } else {
        this.addressService
          .addAddress(this.person.id, { address1, address2, zip, city, country, state, urbanDistrict, commentInner, typeId })
          .pipe(first())
          .subscribe((result) => {
            this._tableData.push(result);
            this.tableData.next(this._tableData);
            this.notificationsService.success('ADDRESS_ADDED', 'person-dialog');
            this.form.reset({});
          });
      }
    }
  }
  remove(address: AddressDto): void {
    if (typeof address.id === 'string') {
      this.addressService
        .deleteAddress(address.id, this.person?.id)
        .pipe(first())
        .subscribe(() => {
          this._tableData = this._tableData.filter((el) => el.id !== address.id);
          this.tableData.next(this._tableData);
          this.notificationsService.success('ADDRESS_DELETED', 'person-dialog');
        });
    }
  }
  update(address: AddressDto): void {
    this.form.reset({
      id: address.id,
      address1: address.address1,
      address2: address.address2,
      zip: address.zip,
      city: address.city,
      country: address.country,
      state: address.state,
      urbanDistrict: address.urbanDistrict,
      commentInner: address.commentInner,
      typeId: address.type,
    });
  }
  onCancel(): void {
    this.form.reset({});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
