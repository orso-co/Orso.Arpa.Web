import { Component, Input, OnInit } from '@angular/core';
import { PersonDto } from '../../../../../../@arpa/models/personDto';
import { first, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { ColumnDefinition } from '../../../../../../@arpa/components/table/table.component';
import { MusicianProfileDto } from '../../../../../../@arpa/models/musicianProfileDto';
import { MuproService } from '../../services/mupro.service';
import { NotificationsService } from '../../../../../../@arpa/services/notifications.service';
import { SelectValueService } from '../../../../../shared/services/select-value.service';

@Component({
  selector: 'arpa-person-profiles-musician',
  templateUrl: './person-profiles-musician.component.html',
  styleUrls: ['./person-profiles-musician.component.scss']
})
export class PersonProfilesMusicianComponent implements OnInit {
  @Input() person: PersonDto | null;

  public form: FormGroup;
  public instrumentOptions$: Observable<SelectItem[]>;
  private _tableData: Array<any>;
  tableData: BehaviorSubject<any> = new BehaviorSubject([])

  columns: ColumnDefinition<MusicianProfileDto>[] = [
    { label: 'persons.mupro.INSTRUMENT', property: 'sectionName', type: 'text'},
    { label: 'persons.mupro.QUALIFICATION', property: 'qualification', type: 'text'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private muproService: MuproService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService,

  ) {
    this.form = this.formBuilder.group({
      id: [null],
      instrumentId: [null],
      sectionName: [null],
    })

  }
  ngOnInit(): void {
    if (this.person) {
      this.tableData.next(this.person.musicianProfiles);
    }
    this.instrumentOptions$ = this.selectValueService
      .load('MusicianProfiles', 'SectionName')
      .pipe(map(() => this.selectValueService.get('MusicianProfiles', 'SectionName')));
  }

  onSubmit() {
    if (this.person) {
      const { id, body } = this.form.getRawValue();
        this.muproService
          .addMusicianProfile(this.person.id, { id, body })
          .pipe(first())
          .subscribe((result) => {
            if (this.person && !this.person?.musicianProfiles) {
              this.person.musicianProfiles = [];
            }
            this.person?.musicianProfiles?.push(result);
            this.tableData.next(this.person?.musicianProfiles);
            this.notificationsService.success('MUSICIAN_PROFILE_ADDED', 'person.mupro');
            this.form.reset({});
          });
      }
    }
  }
