import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { SelectItem } from 'primeng/api';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { BankAccountDto } from '../../../../@arpa/models/bankAccountDto';
import { BankAccountService } from '../services/bank.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'arpa-person-bankdata',
  templateUrl: './person-bankdata.component.html',
  styleUrls: ['./person-bankdata.component.scss']
})
export class PersonBankdataComponent implements OnInit {
  public form: FormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([]);
  private _tableData: Array<any>;
  @Input() person: PersonDto | null;

  public statusOptions$: Observable<SelectItem[]>;

  columns: ColumnDefinition<BankAccountDto>[] = [
    { label: 'persons.bank.IBAN', property: 'iban', type: 'text'},
    { label: 'persons.bank.BIC', property: 'bic', type: 'text'},
    { label: 'persons.bank.ACCOUNT_OWNER', property: 'accountOwner', type: 'text'},
    { label: 'persons.bank.STATUS', property: 'statusId', type: 'state', stateTable: 'BankAccount', stateProperty: 'Status'},
    { label: 'persons.bank.COMMENT_INNER', property: 'commentInner', type: 'text'},

  ];

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankAccountService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService,
  ) {
    this.form = this.formBuilder.group({
      statusId: [null],
      commentInner: [null, [Validators.maxLength(500)]],
      id: [null],
      iban:[null, [Validators.required]],
      bic: [null],
      accountOwner: [null, [Validators.required]],

    });
  }

  ngOnInit() {
    if (this.person) {
    this.tableData.next(this.person.bankAccounts);
  }
  this.statusOptions$ = this.selectValueService
    .load('BankAccount', 'State')
    .pipe(map(() => this.selectValueService.get('BankAccount', 'State')));
  }

  onSubmit() {
    if (this.person) {
      const { id, statusId, commentInner, iban, bic, accountOwner } = this.form.getRawValue();
      if (id) {
        this.bankService
          .updateBankAccount(id, { statusId, commentInner, bic, iban, accountOwner })
          .pipe(first())
          .subscribe((_) => {
            const index = this._tableData.findIndex((el) => el.id === id);
            this._tableData[index] = { ...this._tableData[index], statusId, commentInner, bic, iban, accountOwner };
            this.tableData.next(this._tableData);
            this.notificationsService.success('BANK_ACCOUNT_MODIFIED', 'bank');
            this.form.reset({});
          });
      } else {
        this.bankService
          .addBankAccount(this.person.id, { id, statusId, bic, iban, accountOwner, commentInner })
          .pipe(first())
          .subscribe((result) => {
            this.tableData.next(this.person?.bankAccounts?.push(result));
            this.notificationsService.success('BANK_ACCOUNT_ADDED', 'bank');
            this.form.reset({});
          });
      }
    }
  }

  remove(bankAccounts: BankAccountDto): void {
    if (typeof bankAccounts.id === 'string') {
      this.bankService
        .deleteBankAccount(bankAccounts.id)
        .pipe(first())
        .subscribe(() => {
          this.tableData.next(this.person?.bankAccounts?.filter((e) => e.id != bankAccounts.id));
          this.notificationsService.success('BANK_ACCOUNT_REMOVED', 'bank');
        });
    }
  }

  update(bankAccounts: BankAccountDto) {
    this.form.reset({
      id: bankAccounts.id,
      status: bankAccounts.status,
      commentInner: bankAccounts.commentInner,
      iban: bankAccounts.iban,
      bic: bankAccounts.bic,
      accountOwner: bankAccounts.accountOwner,
    });
  }

  onCancel(): void {
    this.form.reset({});
  }

}
