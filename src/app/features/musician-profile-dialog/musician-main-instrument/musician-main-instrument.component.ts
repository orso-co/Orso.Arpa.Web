import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { SectionDto } from '../../../../@arpa/models/sectionDto';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { first, map, tap } from 'rxjs/operators';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { MusicianService } from '../services/musician.service';
import { SectionService } from '../../../shared/services/section.service';

@Component({
  selector: 'arpa-musician-main-instrument',
  templateUrl: './musician-main-instrument.component.html',
  styleUrls: ['./musician-main-instrument.component.scss'],
})
export class MusicianMainInstrumentComponent implements OnInit {

  @Output()
  viewState = new EventEmitter<number>();

  public form: FormGroup;

  public profile: MusicianProfileDto;
  public sections: Observable<SectionDto[]> = this.config.data.sections;
  public inquiryStatus: Observable<SelectItem[]>;
  public preferredParts: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public preferredPositions: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  selectedInstrument: any;
  state: string = 'createOrUpdate';

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private selectValueService: SelectValueService,
              private musicianService: MusicianService,
              private notificationsService: NotificationsService,
              private sectionsService: SectionService) {
    this.inquiryStatus = this.resolveSelect('InquiryStatusInner');
    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
    });
  }

  get isNew(): boolean {
    return !this.profile;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      levelAssessmentInner: [1, [Validators.min(1), Validators.max(6)]],
      instrumentId: [null, [Validators.required]],
      doublingInstruments: [[], []],
      preferredPartsInner: [[], []],
      inquiryStatusInnerId: [null, [Validators.required]],
      preferredPositionsInnerIds: [[], []],
      isMainProfile: [false, []],
    });

    this.form.controls.instrumentId.valueChanges.subscribe((id) => {
      // instrumentPartCount
      this.sections.pipe(
        map(sections => sections.find(section => section.id === id) as SectionDto),
        first(),
        tap((section: SectionDto) => {
          if (section.instrumentPartCount && section.instrumentPartCount > 0) {
            const options = [];
            for (let i = 0; i < section.instrumentPartCount; i++) {
              options.push({ label: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][i], value: i + 1 });
            }
            this.preferredParts.next(options);
          }
        }),
      );

      this.sectionsService.getPositionsByInstrument(id).subscribe((positions) => {
        if (positions.length) {
          const options: any[] = [];
          positions.forEach(position => {
            options.push({
              label: position.name,
              value: position.id,
            });
          });
          this.preferredPositions.next(options);
        } else {
          this.preferredPositions.next(undefined);
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
    this.createOrUpdate({ ...this.profile, ...this.form.value } as MusicianProfileDto);
  }

  cancel(): void {
    this.ref.close();
  }

  close() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.ref.close();
  }

  private resolveSelect(property: string): Observable<SelectItem[]> {
    return this.selectValueService.load('MusicianProfile', property)
      .pipe(map(() => this.selectValueService.get('MusicianProfile', property)));
  }

  private createOrUpdate(profile: MusicianProfileDto): void {
    if (this.isNew) {
      this.musicianService.createProfile(profile)
        .pipe(first())
        .subscribe((result) => {
          this.config.data.profile.next(result);
          this.notificationsService.success('CREATED', 'musician-profile-dialog');
          this.state = 'created';
        });
    } else {
      this.musicianService.updateProfile(profile)
        .pipe(first())
        .subscribe(() => {
          this.config.data.profile.next(profile);
          this.notificationsService.success('INSTRUMENT_UPDATED', 'musician-profile-dialog');
          this.close();
        });
    }
  }
}
