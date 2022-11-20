import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { BankAccountDto, PersonDto } from '@arpa/models';
import { BankAccountService } from '../services/bank.service';
import { SelectValueService, NotificationsService } from '@arpa/services';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'arpa-person-bankdata',
  templateUrl: './person-bankdata.component.html',
  styleUrls: ['./person-bankdata.component.scss']
})
export class PersonBankdataComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([]);
  private _tableData: Array<any>;
  @Input() person: PersonDto | null;

  public statusOptions$: Observable<SelectItem[]>;

  columns: ColumnDefinition<BankAccountDto>[] = [
    { label: 'persons.bank.IBAN', property: 'iban', type: 'text'},
    { label: 'persons.bank.BIC', property: 'bic', type: 'text'},
    { label: 'persons.bank.ACCOUNT_OWNER', property: 'accountOwner', type: 'text'},
    { label: 'persons.bank.STATUS', property: 'statusId', type: 'state', stateTable: 'BankAccount', stateProperty: 'State'},
    { label: 'persons.bank.COMMENT_INNER', property: 'commentInner', type: 'text'},

  ];
  private subscription: Subscription;
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
      this.person.bankAccounts = this.person.bankAccounts || [];
      this._tableData = this.person.bankAccounts;
      this.tableData.next(this._tableData);
      this.subscription = this.tableData.subscribe(d => this.person!.bankAccounts = d);
  }
  this.statusOptions$ = this.selectValueService
    .load('BankAccount', 'Status')
    .pipe(map(() => this.selectValueService.get('BankAccount', 'Status')));
  }

  onSubmit() {
    if (this.person) {
      const { id, statusId, commentInner, iban, bic, accountOwner } = this.form.getRawValue();
      if (id) {
        this.bankService
          .updateBankAccount(this.person?.id, id, { statusId, commentInner, bic, iban, accountOwner })
          .pipe(first())
          .subscribe((_) => {
            const index = this._tableData.findIndex((el) => el.id === id);
            this._tableData[index] = { ...this._tableData[index], statusId, commentInner, bic, iban, accountOwner };
            this.tableData.next(this._tableData);
            this.notificationsService.success('BANK_ACCOUNT_MODIFIED', 'person-dialog');
            this.form.reset({});
          });
      } else {
        this.bankService
          .addBankAccount(this.person.id, { bic, iban, accountOwner, commentInner })
          .pipe(first())
          .subscribe((result) => {
            this._tableData.push(result);
            this.tableData.next(this._tableData);
            this.notificationsService.success('BANK_ACCOUNT_ADDED', 'person-dialog');
            this.form.reset({});
          });
      }
    }
  }

  remove(bankAccounts: BankAccountDto): void {
    if (typeof bankAccounts.id === 'string') {
      this.bankService
        .deleteBankAccount(bankAccounts.id, this.person?.id )
        .pipe(first())
        .subscribe(() => {
          this._tableData = this._tableData.filter(e => e.id !== bankAccounts.id);
          this.tableData.next(this._tableData);
          this.notificationsService.success('BANK_ACCOUNT_REMOVED', 'person-dialog');
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
