import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map, filter } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { SelectValueService, NotificationsService, SectionService, EnumService } from '@arpa/services';
import { MusicianService } from '../services/musician.service';
import {
  MusicianProfileModifyBodyDto,
  SectionDto,
  MusicianProfileDto,
  DoublingInstrumentDto,
  MusicianProfileCreateBodyDto,
} from '@arpa/models';

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
  public profile$$: MusicianProfileDto | undefined = undefined;
  public instrumentName: string;
  public sections$: Observable<SectionDto[]> = this.config.data.sections;
  public preferredParts: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public preferredPositionOptions$: Observable<SelectItem[]>;
  public availabilityOptions$: Observable<SelectItem[]>;
  public salaryOptions$: Observable<SelectItem[]>;
  public qualificationOptions$: Observable<SelectItem[]>;
  inquiryStatusOptions$: Observable<SelectItem[]>;
  public instruments: Observable<DoublingInstrumentDto[]>;
  public doublingInstruments: FormListElement[] = [];
  public isNew: boolean;

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
      this.profile$$ = profile;
      this.isNew = !profile.id;
      if (profile.doublingInstruments?.length) {
        profile.doublingInstruments.forEach((instrument) => this.doublingInstruments.push(this.getFormGroup(instrument)));
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      levelAssessmentInner: [null, []],
      levelAssessmentTeam: [null, [Validators.min(0), Validators.max(5)]],
      profilePreferenceInner: [null, [Validators.min(0), Validators.max(5)]],
      profilePreferenceTeam: [null, [Validators.min(0), Validators.max(5), Validators.required]],
      salaryComment: [null, [Validators.maxLength(500)]],
      salaryId: [null, []],
      qualificationId: [null, [Validators.required]],
      backgroundTeam: [null, [Validators.maxLength(1000)]],
      backgroundInner: [null, [Validators.maxLength(1000)]],
      preferredPartsTeam: [[], []],
      preferredPartsInner: [[], []],
      preferredPositionsTeamIds: [[], []],
      preferredPositionsInnerIds: [[], []],
      inquiryStatusTeam: [null, []],
      inquiryStatusInner: [null, []],
      isMainProfile: [null, []],
      instrumentId: [null, [Validators.required]],
    });

    if (this.profile$$) {
      if (!this.isNew) {
       this.onChangeInstrumentId(this.profile$$.instrumentId!)
      }
      this.form.patchValue(this.profile$$);
      this.form.controls.instrumentId.valueChanges.subscribe(instrumentId => this.onChangeInstrumentId(instrumentId));
    }
  }

  onChangeInstrumentId(instrumentId: string){
    this.preferredPositionOptions$ = this.sectionService.getPositionsByInstrument(instrumentId!);
    this.form.controls.preferredPositionsTeamIds.setValue([]);
    this.form.controls.preferredPositionsInnerIds.setValue([]);

    this.sections$
      .pipe(
        map((sections) => sections.find((section) => section.id === instrumentId) as SectionDto),
        first(),
        filter(section => !!section)
      )
      .subscribe((section: SectionDto) => {
        this.instrumentName = section.name || '';
        const options = [];
        if (section.instrumentPartCount && section.instrumentPartCount > 0) {
          for (let i = 0; i < section.instrumentPartCount; i++) {
            options.push({ label: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][i], value: i + 1 });
          }
        }
        this.preferredParts.next(options);
        this.form.controls.preferredPartsTeam.setValue([]);
        this.form.controls.preferredPartsInner.setValue([]);
      });

  }
onSubmit() {
    if (this.isNew){
      this.create();
    } else {
      this.update();
    }
}

  update() {
    this.musicianService
      .updatePersonProfile(this.profile$$?.id!, {
        ...this.form.value,
      } as MusicianProfileModifyBodyDto)
      .pipe(first())
      .subscribe((updatedProfile) => {
        this.config.data.profile.next(updatedProfile);
        this.ref.close(updatedProfile);
        this.notificationsService.success('UPDATED', 'musician-profile-dialog')
      });
  }
  create() {
    this.musicianService
      .createProfileForPerson(this.config.data.personId, {
        ...this.form.value,
      } as MusicianProfileCreateBodyDto)
      .pipe(first())
      .subscribe((createdProfile) => {
        this.config.data.profile.next(createdProfile);
        this.ref.close(createdProfile);
        this.notificationsService.success('CREATED', 'musician-profile-dialog')
      });
  }

  public cancel(): void {
    this.ref.close();
  }

  updateDoubling(item: FormListElement) {
    const { formGroup, ...listData } = item;
    const { id, ...data } = formGroup.value;
    this.musicianService
      .updateDoublingInstrument(this.profile$$?.id, id, data, false)
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
