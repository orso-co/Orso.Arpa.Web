import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SelectValueService } from '../../../core/services/select-value.service';
import { SelectItem } from 'primeng/api';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';
import { SectionDto } from '../../../model/sectionDto';

@Component({
  selector: 'arpa-edit-musician-profile',
  templateUrl: './edit-musician-profile.component.html',
  styleUrls: ['./edit-musician-profile.component.scss'],
})
export class EditMusicianProfileComponent implements OnInit {

  public form: FormGroup;

  public profile: MusicianProfileDto = this.config.data.profile;
  public sections: Observable<SectionDto[]> = this.config.data.sections;
  public inquiryStatus: Observable<SelectItem[]>;
  public preferredParts: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  selectedInstrument: any;
  preferredPositions: any;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private selectValueService: SelectValueService) {
    this.inquiryStatus = this.resolveSelect('InquiryStatusInner');
    this.preferredPositions = this.resolveSelect('PreferredPositions');
  }

  private resolveSelect(property: string): Observable<SelectItem[]> {
    return this.selectValueService.load('MusicianProfile', property)
      .pipe(map(() => this.selectValueService.get('MusicianProfile', property)));
  }

  get isNew(): boolean {
    return !this.profile;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      levelAssessmentInner: [1, [Validators.min(1), Validators.max(6)]],
      instrumentId: [null, [Validators.required]],
      doublingInstruments: [null, []],
      preferredPartsInner: [null, []],
      inquiryStatusInnerId: [null, []],
      preferredPositionsInnerIds: [null, []],
      isMainProfile: [false, []],
    });

    this.form.controls.instrumentId.valueChanges.subscribe((id) => {
      // instrumentPartCount
      this.sections.pipe(
        map(sections => sections.find(section => section.id === id) as SectionDto),
        first(),
      ).subscribe((section: SectionDto) => {
        if (section.instrumentPartCount && section.instrumentPartCount > 0) {
          const options = [];
          for (let i = 0; i < section.instrumentPartCount; i++) {
            options.push({ label: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][i], value: i + 1 });
          }
          this.preferredParts.next(options);
        }
      });
    });

    if (this.profile) {
      this.form.patchValue(this.profile);
      this.form.controls.instrumentId.disable();
      if (this.profile.isMainProfile) {
        this.form.controls.isMainProfile.disable();
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.ref.close({ ...this.profile, ...this.form.value } as MusicianProfileDto);
  }

  cancel(): void {
    this.ref.close(null);
  }
}
