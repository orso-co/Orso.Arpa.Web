import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { MusicianService } from '../services/musician.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { EducationDto } from '../../../../@arpa/models/educationDto';

@Component({
  selector: 'arpa-musician-education',
  templateUrl: './musician-education.component.html',
  styleUrls: ['./musician-education.component.scss'],
})
export class MusicianEducationComponent implements OnInit {

  public form: FormGroup;

  public profile: MusicianProfileDto;

  public educationTypes: Observable<SelectItem[]>;

  public educations: Array<any>;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private selectValueService: SelectValueService,
              private musicianService: MusicianService,
              private notificationsService: NotificationsService) {

    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
    });
    this.educationTypes = this.selectValueService.load('Education', 'Type')
      .pipe(map(() => this.selectValueService.get('Education', 'Type')));

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      timeSpan: [null, [Validators.required]],
      institution: [null, [Validators.required]],
      typeId: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.educations = (this.profile.educations && this.profile.educations.length) ? this.profile.educations : [];
  }

  add(): void {
    this.musicianService.addEducation(this.profile.id, { ...this.form.value })
      .pipe(first())
      .subscribe(() => {
        this.educations.push(this.form.value);
        this.notificationsService.success('EDUCATION_ADDED');
      });
  }

  remove(education: EducationDto): void {
    this.musicianService.removeEducation(education)
      .pipe(first())
      .subscribe(() => {
        this.educations = this.educations.filter(e => e.id != education.id);
        this.notificationsService.success('EDUCATION_REMOVED');
      });
  }
}
