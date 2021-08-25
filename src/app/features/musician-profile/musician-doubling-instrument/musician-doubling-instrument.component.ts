import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectValueService } from '../../../core/services/select-value.service';
import { MusicianService } from '../services/musician.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { MyDoublingInstrumentDto } from '../../../model/myDoublingInstrumentDto';

interface FormList extends MyDoublingInstrumentDto {
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

  public doublingInstruments: FormList[] = [];

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private selectValueService: SelectValueService,
              private musicianService: MusicianService,
              private notificationsService: NotificationsService) {

    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
      if (profile.doublingInstruments?.length) {
        profile.doublingInstruments.forEach(instrument => this.doublingInstruments.push(this.getFormGroup(instrument)));
      }
    });

    this.availability = this.selectValueService.load('MusicianProfileSection', 'InstrumentAvailability')
      .pipe(map(() => this.selectValueService.get('MusicianProfileSection', 'InstrumentAvailability')));
  }

  ngOnInit(): void {
    this.sections = this.musicianService.getDoublingInstruments(this.profile.instrumentId);
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
      .subscribe(() => {
        this.doublingInstruments.push(this.form.value);
        this.notificationsService.success('DOUBLINGINSTRUMENT_ADDED');
      });
  }

  update(formGroup: FormGroup): void {
    const {id, ...data} = formGroup.value;
    this.musicianService.updateDoublingInstrument(this.profile.id, id, data)
      .pipe(first())
      .subscribe(() => {
        this.doublingInstruments = this.doublingInstruments.filter((instrument) => {
          return instrument.id !== formGroup.value.instrumentId;
        });
        this.doublingInstruments.push(this.getFormGroup({ ...formGroup.value }));
        this.notificationsService.success('DOUBLINGINSTRUMENT_ADDED');
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

}
