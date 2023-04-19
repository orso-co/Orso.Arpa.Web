import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { SelectValueService, NotificationsService } from '@arpa/services';
import { MusicianProfileDto, EducationDto } from '@arpa/models';
import { MusicianService } from '../services/musician.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';

@Component({
  selector: 'arpa-musician-education',
  templateUrl: './musician-education.component.html',
  styleUrls: ['./musician-education.component.scss'],
})
export class MusicianEducationComponent implements OnInit {
  public form: FormGroup;

  public profile: MusicianProfileDto;

  public educationTypes: Observable<SelectItem[]>;
  public educations: BehaviorSubject<any> = new BehaviorSubject([]);
  columns: ColumnDefinition<EducationDto>[] = [
    { label: 'musician-profile-dialog.TIMESPAN', property: 'timeSpan', type: 'text', hideFilter: true },
    { label: 'musician-profile-dialog.EDUCATION_INSTITUTION', property: 'institution', type: 'text', hideFilter: true },
  ];
  private _educations: Array<any>;

  constructor(
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private selectValueService: SelectValueService,
    private musicianService: MusicianService,
    private notificationsService: NotificationsService
  ) {
    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
    });
    this.educationTypes = this.selectValueService.get('Education', 'Type');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      timeSpan: [null, [Validators.required]],
      institution: [null, [Validators.required]],
      typeId: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this._educations = this.profile.educations && this.profile.educations.length ? this.profile.educations : [];
    this.educations.next(this._educations);
  }

  add(): void {
    this.musicianService
      .addEducation(this.profile.id, { ...this.form.value }, this.config.data.isMe)
      .pipe(first())
      .subscribe((result) => {
        this._educations.push(result);
        this.educations.next(this._educations);
        this.notificationsService.success('EDUCATION_ADDED', 'musician-profile-dialog');
      });
  }

  remove(education: EducationDto): void {
    this.musicianService
      .removeEducation(education)
      .pipe(first())
      .subscribe(() => {
        this._educations = this._educations.filter((e) => e.id != education.id);
        this.educations.next(this._educations);
        this.notificationsService.success('EDUCATION_REMOVED', 'musician-profile-dialog');
      });
  }
}
