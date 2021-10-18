import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { MusicianService } from '../services/musician.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { first, map, take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { MyDoublingInstrumentDto } from '../../../../@arpa/models/myDoublingInstrumentDto';
import { DoublingInstrumentDto } from '../../../../@arpa/models/doublingInstrumentDto';

export interface FormList extends MyDoublingInstrumentDto {
  formGroup: FormGroup;
}

@Component({
  selector: 'arpa-musician-doubling-instrument',
  templateUrl: './musician-doubling-instrument.component.html',
  styleUrls: ['./musician-doubling-instrument.component.scss'],
})
export class MusicianDoublingInstrumentComponent implements OnInit {

  public form: FormGroup;

  public profile: MusicianProfileDto;
  public sections: Observable<any[]>;

  public availability: Observable<SelectItem[]>;
  public instruments: BehaviorSubject<DoublingInstrumentDto[]>;
  public availableInstruments: DoublingInstrumentDto[];

  public doublingInstruments: FormList[] = [];

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private selectValueService: SelectValueService,
              private musicianService: MusicianService,
              private notificationsService: NotificationsService) {

    this.instruments = new BehaviorSubject([] as DoublingInstrumentDto[]);

    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
      if (profile.doublingInstruments?.length) {
        profile.doublingInstruments.forEach(instrument => this.doublingInstruments.push(this.getFormGroup(instrument)));
      }

      this.config.data.doublingInstruments.pipe(take(1)).subscribe((instruments: DoublingInstrumentDto[]) => {
        this.availableInstruments = instruments;
        this.filterInstruments();
      });
    });

    this.sections = this.config.data.sections;

    this.availability = this.selectValueService.load('MusicianProfileSection', 'InstrumentAvailability')
      .pipe(map(() => this.selectValueService.get('MusicianProfileSection', 'InstrumentAvailability')));
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      instrumentId: [null, []],
      levelAssessmentInner: [1, [Validators.min(1), Validators.max(6)]],
      availabilityId: [null, [Validators.required]],
      comment: [null, []],
    });
  }

  add(): void {
    this.musicianService.addDoublingInstrument(this.profile.id, { ...this.form.value })
      .pipe(first())
      .subscribe((result) => {
        this.doublingInstruments.push(this.getFormGroup({ ...result }));
        this.filterInstruments();
        this.notificationsService.success('DOUBLING_INSTRUMENT_ADDED', 'musician-profile-dialog');
      });
  }

  update(item: FormList): void {
    const { formGroup, ...listData } = item;
    const { id, ...data } = formGroup.value;
    this.musicianService.updateDoublingInstrument(this.profile.id, id, data, this.config.data.isMe)
      .pipe(first())
      .subscribe(() => {
        this.doublingInstruments.forEach((item, i) => {
          if (item.id === formGroup.value.id) {
            this.doublingInstruments[i] = this.getFormGroup({ ...listData, ...formGroup.value });
          }
        });
        this.notificationsService.success('DOUBLING_INSTRUMENT_UPDATED', 'musician-profile-dialog');
      });
  }

  remove(instrument: any): void {
    this.musicianService.removeDoublingInstrument(this.profile.id, instrument.id)
      .pipe(first())
      .subscribe(() => {
        const index = this.doublingInstruments.indexOf(instrument);
        if (index > -1) {
          this.doublingInstruments.splice(index, 1);
        }
        this.filterInstruments();
        this.notificationsService.success('DOUBLING_INSTRUMENT_REMOVED', 'musician-profile-dialog');
      });
  }

  private getFormGroup(data: MyDoublingInstrumentDto): FormList {
    const formGroup = this.formBuilder.group({
      id: [data.id, [Validators.required]],
      levelAssessmentInner: [1, [Validators.min(1), Validators.max(6)]],
      availabilityId: [null, [Validators.required]],
      comment: [null, []],
    });
    if (data) {
      formGroup.patchValue(data);
    }
    return {
      ...data,
      formGroup,
    };
  }

  private filterInstruments() {
    this.instruments.next(this.availableInstruments.filter(({ id }) => {
      return !this.doublingInstruments.some((instrument) => {
        return instrument.instrumentId === id;
      });
    }));
  }

}
