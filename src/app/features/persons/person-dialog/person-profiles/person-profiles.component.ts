import { Component, Input, OnInit } from '@angular/core';
import { PersonDto } from '../../../../../@arpa/models/personDto';
import { NotificationsService } from '../../../../../@arpa/services/notifications.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { MusicianProfileDto } from '../../../../../@arpa/models/musicianProfileDto';
import { SelectValueService } from '../../../../shared/services/select-value.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { MuproService } from '../services/mupro.service';

@Component({
  selector: 'arpa-person-profiles',
  templateUrl: './person-profiles.component.html',
  styleUrls: ['./person-profiles.component.scss']
})
export class PersonProfilesComponent implements OnInit {
  public form: FormGroup;
  tableData: BehaviorSubject<any> = new BehaviorSubject([])
  private _tableData: Array<any>;
  @Input() person: PersonDto | null;

  public instrumentOptions$: Observable<SelectItem[]>;

  columns: ColumnDefinition<MusicianProfileDto>[] = [
    // { label: 'persons.mupro.ID', property: 'id', type: 'text'},
    { label: 'persons.mupro.INSTRUMENT', property: 'sectionName', type: 'text'},
    { label: 'persons.mupro.QUALIFICATION', property: 'qualification', type: 'text'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private muproService: MuproService,
    private notificationService: NotificationsService,
    private selectValueService: SelectValueService,

  ) {
    this.form = this.formBuilder.group({
      id: [null],
      instrumentId: [null],
      qualificationId: [null],
      sectionName: [null],
      qualification: [null],
    })

  }

  ngOnInit() {
    if (this.person) {
      this.tableData.next(this.person.musicianProfiles);
    }
    this.instrumentOptions$ = this.selectValueService
      .load('MusicianProfiles', 'SectionName')
      .pipe(map(() => this.selectValueService.get('MusicianProfiles', 'SectionName')));
    // console.log("dropdown-values" , this.instrumentOptions$);
  }
//the following is WIP and continued in a new branch! WR 19.10.2022:
  // onSubmit() {
  //   if (this.person) {
  //     const { id, instrumentId, qualificationId } = this.form.getRawValue();
  //     if (id) {
  //       this.muproService
  //         .updateMusicianProfile(this.person?.id, id, { instrumentId, qualificationId })
  //         .pipe(first())
  //         .subscribe((_) => {
  //           const index = this._tableData.findIndex((el) => el.id === id);
  //           this._tableData[index] = { ...this._tableData[index], statusId, commentInner, bic, iban, accountOwner };
  //           this.tableData.next(this._tableData);
  //           this.notificationsService.success('BANK_ACCOUNT_MODIFIED', 'person-dialog');
  //           this.form.reset({});
  //         });
  //     } else {
  //       this.bankService
  //         .addBankAccount(this.person.id, { id, bic, iban, accountOwner, commentInner })
  //         .pipe(first())
  //         .subscribe((result) => {
  //           if (this.person && !this.person?.bankAccounts) {
  //             this.person.bankAccounts = [];
  //           }
  //           this.person?.bankAccounts?.push(result);
  //           this.tableData.next(this.person?.bankAccounts);
  //           this.notificationsService.success('BANK_ACCOUNT_ADDED', 'person-dialog');
  //           this.form.reset({});
  //         });
  //     }
  //   }
  // }

}
