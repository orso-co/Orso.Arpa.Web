import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { BankAccountDto, PersonDto } from '@arpa/models';
import { NotificationsService, MeService } from '@arpa/services';
import { first } from 'rxjs/operators';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'arpa-user-layout-bankdata',
  templateUrl: './user-bankdata.component.html',
  styleUrls: ['./user-bankdata.component.scss'],
})
export class UserBankdataComponent implements OnInit {
  public form: UntypedFormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([]);
  private _tableData: Array<any>;
  @Input() bankAccounts: BankAccountDto[] = [];
  @Input() person: PersonDto | null;

  columns: ColumnDefinition<BankAccountDto>[] = [
    { label: 'profile.bank.IBAN', property: 'iban', type: 'text' },
    { label: 'profile.bank.BIC', property: 'bic', type: 'text' },
    { label: 'profile.bank.ACCOUNT_OWNER', property: 'accountOwner', type: 'text' },
    { label: 'profile.bank.COMMENT_INNER', property: 'commentInner', type: 'text' },
    { label: 'profile.bank.STATUS', property: 'statusId', type: 'state', stateTable: 'BankAccount', stateProperty: 'Status' },
  ];

  constructor(private formBuilder: UntypedFormBuilder, private meService: MeService, private notificationsService: NotificationsService) {
    this.form = this.formBuilder.group({
      commentInner: [null, [Validators.maxLength(500)]],
      id: [null],
      iban: [null, [Validators.required]],
      bic: [null],
      accountOwner: [null, [Validators.required]],
      statusId: [null],
    });
  }

  ngOnInit() {
    this._tableData = this.bankAccounts && this.bankAccounts.length ? cloneDeep(this.bankAccounts) : [];
    this.tableData.next(this._tableData);
  }

  onSubmit() {
    const { id, commentInner, iban, bic, accountOwner } = this.form.getRawValue();
    if (id) {
      this.meService
        .updateBankAccount(id, { commentInner, bic, iban, accountOwner })
        .pipe(first())
        .subscribe((_) => {
          const index = this._tableData.findIndex((el) => el.id === id);
          this._tableData[index] = { ...this._tableData[index], commentInner, bic, iban, accountOwner };
          this.tableData.next(this._tableData);
          this.notificationsService.success('BANK_ACCOUNT_MODIFIED', 'bank');
          this.form.reset({});
        });
    } else {
      this.meService
        .addBankAccount(this.person?.id, { bic, iban, accountOwner, commentInner })
        .pipe(first())
        .subscribe((result) => {
          this._tableData.push(result);
          this.tableData.next(this._tableData);
          this.notificationsService.success('BANK_ACCOUNT_ADDED', 'contact');
          this.form.reset({});
        });
    }
  }

  remove(bankAccount: BankAccountDto): void {
    this.meService
      .deleteBankAccount(bankAccount.id, this.person?.id)
      .pipe(first())
      .subscribe(() => {
        this.tableData.next(this._tableData.filter((e) => e.id != bankAccount.id));
        this.notificationsService.success('BANK_ACCOUNT_REMOVED', 'bank');
      });
  }

  update(bankAccounts: BankAccountDto) {
    this.form.reset({
      id: bankAccounts.id,
      commentInner: bankAccounts.commentInner,
      iban: bankAccounts.iban,
      bic: bankAccounts.bic,
    });
  }

  onCancel(): void {
    this.form.reset({});
  }
}
