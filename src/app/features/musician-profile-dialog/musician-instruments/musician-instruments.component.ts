import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { SelectValueService, NotificationsService, SectionService, EnumService } from '@arpa/services';
import { MusicianService } from '../services/musician.service';
import { MusicianProfileModifyBodyDto, SectionDto, MusicianProfileDto, DoublingInstrumentDto } from '@arpa/models';

interface FormListElement extends DoublingInstrumentDto {
  formGroup: FormGroup;
}

@Component({
  selector: 'arpa-musician-instruments',
  templateUrl: './musician-instruments.component.html',
  styleUrls: ['./musician-instruments.component.scss'],
})
export class MusicianInstrumentsComponent implements OnInit {
  public form: FormGroup;

  public profile: MusicianProfileDto;
  public instrumentName: string;

  public sections: Observable<SectionDto[]> = this.config.data.sections;
  public preferredParts: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public preferredPositionOptions$: Observable<SelectItem[]>;
  public availabilityOptions$: Observable<SelectItem[]>;
  public salaryOptions$: Observable<SelectItem[]>;
  public qualificationOptions$: Observable<SelectItem[]>;
  inquiryStatusOptions$: Observable<SelectItem[]>;

  public instruments: Observable<DoublingInstrumentDto[]>;
  public doublingInstruments: FormListElement[] = [];

  constructor(
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private selectValueService: SelectValueService,
    private musicianService: MusicianService,
    private notificationsService: NotificationsService,
    private sectionService: SectionService,
    private enumService: EnumService
  ) {
    this.availabilityOptions$ = this.selectValueService
      .load('MusicianProfileSection', 'InstrumentAvailability')
      .pipe(map(() => this.selectValueService.get('MusicianProfileSection', 'InstrumentAvailability')));
    this.salaryOptions$ = this.resolveSelect('Salary');
    this.qualificationOptions$ = this.resolveSelect('Qualification');
    this.inquiryStatusOptions$ = this.enumService.getMusicianProfileInquiryStatusSelectItems();

    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
      if (profile.doublingInstruments?.length) {
        profile.doublingInstruments.forEach((instrument) => this.doublingInstruments.push(this.getFormGroup(instrument)));
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      levelAssessmentInner: [null, [Validators.min(0), Validators.max(5)]],
      levelAssessmentTeam: [null, [Validators.min(0), Validators.max(5)]],
      profilePreferenceInner: [null, [Validators.min(0), Validators.max(5)]],
      profilePreferenceTeam: [null, [Validators.min(0), Validators.max(5)]],
      salaryComment: [null, [Validators.maxLength(500)]],
      salaryId: [null, []],
      qualificationId: [null, [Validators.required]],
      backgroundTeam: [null, [Validators.maxLength(1000)]],
      backgroundInner: [null, [Validators.maxLength(1000)]],
      preferredPartsTeam: [[], []],
      preferredPartsInner: [[], []],
      preferredPositionsTeamIds: [[], []],
      preferredPositionsInnerIds: [[], []],
      inquiryStatusTeamId: [null, []],
      inquiryStatusInnerId: [null, []],
      isMainProfile: [null, []],
    });

    if (this.profile) {
      this.preferredPositionOptions$ = this.sectionService.getPositionsByInstrument(this.profile.instrumentId!);

      this.sections
        .pipe(
          map((sections) => sections.find((section) => section.id === this.profile.instrumentId) as SectionDto),
          first()
        )
        .subscribe((section: SectionDto) => {
          this.instrumentName = section.name || '';
          if (section.instrumentPartCount && section.instrumentPartCount > 0) {
            const options = [];
            for (let i = 0; i < section.instrumentPartCount; i++) {
              options.push({ label: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][i], value: i + 1 });
            }
            this.preferredParts.next(options);
          }
        });
      this.form.patchValue(this.profile);
    }
  }

  update() {
    this.musicianService
      .updatePersonProfile(this.profile.id!, {
        ...this.form.value,
      } as MusicianProfileModifyBodyDto)
      .pipe(first())
      .subscribe((updatedProfile) => {
        this.config.data.profile.next(updatedProfile);
        this.ref.close(updatedProfile);
      });
  }

  public cancel(): void {
    this.ref.close();
  }

  updateDoubling(item: FormListElement) {
    const { formGroup, ...listData } = item;
    const { id, ...data } = formGroup.value;
    this.musicianService
      .updateDoublingInstrument(this.profile.id, id, data, false)
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

  private resolveSelect(property: string): Observable<SelectItem[]> {
    return this.selectValueService
      .load('MusicianProfile', property)
      .pipe(map(() => this.selectValueService.get('MusicianProfile', property)));
  }

  private getFormGroup(data: DoublingInstrumentDto): FormListElement {
    const formGroup = this.formBuilder.group({
      id: [null, [Validators.required]],
      levelAssessmentTeam: [1, [Validators.min(1), Validators.max(6)]],
    });
    formGroup.patchValue(data);
    return {
      ...data,
      formGroup,
    };
  }
}
