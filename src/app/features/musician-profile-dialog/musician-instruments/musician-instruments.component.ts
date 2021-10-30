import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DoublingInstrumentDto } from '../../../../@arpa/models/doublingInstrumentDto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { SectionDto } from '../../../../@arpa/models/sectionDto';
import { SelectItem } from 'primeng/api';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { MusicianService } from '../services/musician.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';

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
  public inquiryStatus: Observable<SelectItem[]>;
  public inquiryStatusTeam: Observable<SelectItem[]>;
  public preferredParts: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public preferredPositions: Observable<SelectItem[]>;
  public availability: Observable<SelectItem[]>;
  public salary: Observable<SelectItem[]>;
  public qualification: Observable<SelectItem[]>;

  public instruments: Observable<DoublingInstrumentDto[]>;
  public doublingInstruments: FormListElement[] = [];

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private selectValueService: SelectValueService,
              private musicianService: MusicianService,
              private notificationsService: NotificationsService) {
    this.inquiryStatus = this.resolveSelect('InquiryStatusInner');
    this.inquiryStatusTeam = this.resolveSelect('InquiryStatusTeam');
    this.preferredPositions = this.resolveSelect('PreferredPositions');
    this.availability = this.selectValueService.load('MusicianProfileSection', 'InstrumentAvailability')
      .pipe(map(() => this.selectValueService.get('MusicianProfileSection', 'InstrumentAvailability')));
    this.salary = this.resolveSelect('Salary');
    this.qualification = this.resolveSelect('Qualification');

    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
      if (profile.doublingInstruments?.length) {
        profile.doublingInstruments.forEach(instrument => this.doublingInstruments.push(this.getFormGroup(instrument)));
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      levelAssessmentTeam: [1, [Validators.min(1), Validators.max(6)]],
      salaryComment: [null, []],
      salaryId: [null, []],
      qualificationId: [null, [Validators.required]],
      backgroundTeam: [null, []],
      preferredPartsTeam: [[], []],
      preferredPositionsTeamIds: [[], []],
      inquiryStatusTeamId: [null, [Validators.required]],
    });

    if (this.profile) {
      this.sections.pipe(
        map(sections => sections.find(section => section.id === this.profile.instrumentId) as SectionDto),
        first(),
      ).subscribe((section: SectionDto) => {
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
    const {
      id,
      isMainProfile,
      levelAssessmentInner,
      levelAssessmentTeam,
      profilePreferenceInner,
      profilePreferenceTeam,
      inquiryStatusInnerId,
      inquiryStatusTeamId,
      preferredPartsInner,
      preferredPartsTeam,
      personId,
      instrumentId,
      deactivation,
    } = this.profile;

    this.musicianService.updatePersonProfile({
      id,
      isMainProfile,
      levelAssessmentInner,
      levelAssessmentTeam,
      profilePreferenceInner,
      profilePreferenceTeam,
      inquiryStatusInnerId,
      inquiryStatusTeamId,
      preferredPartsInner,
      preferredPartsTeam,
      personId,
      instrumentId,
      deactivation,
      ...this.form.value,
    } as MusicianProfileDto)
      .pipe(first())
      .subscribe(() => {
        this.config.data.profile.next(this.profile);
        this.notificationsService.success('INSTRUMENT_UPDATED', 'musician-profile-dialog');
        this.ref.close();
      });
  }

  updateDoubling(item: FormListElement) {
    const { formGroup, ...listData } = item;
    const { id, ...data } = formGroup.value;
    this.musicianService.updateDoublingInstrument(this.profile.id, id, data, false)
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
    return this.selectValueService.load('MusicianProfile', property)
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
