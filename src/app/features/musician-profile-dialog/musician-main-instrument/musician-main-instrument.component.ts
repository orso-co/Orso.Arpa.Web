import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MyMusicianProfileCreateDto, MyMusicianProfileDto, MyMusicianProfileModifyBodyDto, SectionDto } from '@arpa/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectValueService, SectionService, NotificationsService, EnumService } from '@arpa/services';
import { first, map, tap } from 'rxjs/operators';
import { MusicianService } from '../services/musician.service';

@Component({
  selector: 'arpa-musician-main-instrument',
  templateUrl: './musician-main-instrument.component.html',
  styleUrls: ['./musician-main-instrument.component.scss'],
})
export class MusicianMainInstrumentComponent implements OnInit {
  @Output()
  viewState = new EventEmitter<number>();

  public form: UntypedFormGroup;

  public profile: MyMusicianProfileDto;
  public sections: Observable<SectionDto[]> = this.config.data.sections;
  public preferredParts: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public preferredPositions: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public qualificationOptions$: Observable<SelectItem[]>;
  inquiryStatusOptions$: Observable<SelectItem[]>;

  selectedInstrument: any;
  state: string = 'createOrUpdate';

  constructor(
    public config: DynamicDialogConfig,
    private formBuilder: UntypedFormBuilder,
    public ref: DynamicDialogRef,
    private selectValueService: SelectValueService,
    private musicianService: MusicianService,
    private notificationsService: NotificationsService,
    private sectionsService: SectionService,
    private enumService: EnumService
  ) {
    this.qualificationOptions$ = this.selectValueService.getMusicianProfileQualifications();
    this.inquiryStatusOptions$ = this.enumService.getMusicianProfileInquiryStatusSelectItems();
    this.config.data.profile.pipe(first()).subscribe((profile: MyMusicianProfileDto) => {
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
      inquiryStatusInner: [null, [Validators.required]],
      preferredPositionsInnerIds: [[], []],
      isMainProfile: [false, []],
    });

    this.form.controls.instrumentId.valueChanges.subscribe((id) => {
      // instrumentPartCount
      this.sections.pipe(
        map((sections) => sections.find((section) => section.id === id) as SectionDto),
        first(),
        tap((section: SectionDto) => {
          if (section.instrumentPartCount && section.instrumentPartCount > 0) {
            const options = [];
            for (let i = 0; i < section.instrumentPartCount; i++) {
              options.push({ label: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][i], value: i + 1 });
            }
            this.preferredParts.next(options);
          }
        })
      );

      this.sectionsService.getPositionsByInstrument(id).subscribe((positions) => {
        if (positions.length) {
          this.preferredPositions.next(positions);
        } else {
          this.preferredPositions.next(undefined);
        }
      });
    });

    if (this.profile) {
      this.form.patchValue({ ...this.profile, instrumentId: this.profile.instrument?.id });
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
    this.createOrUpdate({ ...this.profile, ...this.form.value });
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

  private createOrUpdate(profile: MyMusicianProfileCreateDto | MyMusicianProfileModifyBodyDto): void {
    if (this.isNew) {
      this.musicianService
        .createProfileForMe(profile as MyMusicianProfileCreateDto)
        .pipe(first())
        .subscribe((result) => {
          this.config.data.profile.next(result);
          this.notificationsService.success('CREATED', 'musician-profile-dialog');
          this.state = 'created';
        });
    } else {
      this.musicianService
        .updateMyProfile(this.profile.id!, profile as MyMusicianProfileModifyBodyDto)
        .pipe(first())
        .subscribe(() => {
          this.config.data.profile.next(profile);
          this.notificationsService.success('INSTRUMENT_UPDATED', 'musician-profile-dialog');
          this.close();
        });
    }
  }
}
