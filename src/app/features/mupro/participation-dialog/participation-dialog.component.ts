import { MyProjectParticipationDto } from 'src/@arpa/models/myProjectDto';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProjectParticipationDto } from './../../../../@arpa/models/projectParticipationDto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectDto } from 'src/@arpa/models/projectDto';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
@Component({
  selector: 'arpa-participation-dialog',
  templateUrl: './participation-dialog.component.html',
  styleUrls: ['./participation-dialog.component.scss'],
})
export class ParticipationDialogComponent implements OnInit {
  form: FormGroup;
  participationPerformer: MyProjectParticipationDto = this.config.data.participationPerformer;
  participationStaff: MyProjectParticipationDto = this.config.data.participationStaff;
  statusOptions$: Observable<SelectItem[]> = this.config.data.statusOptions$;
  musicianProfileId: string = this.config.data.musicianProfileId;
  projects: ProjectDto = this.config.data.projects;

  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private translate: TranslateService
    ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      participationStatusIdPerformer: [null, [Validators.required]],
      commentPerformer: [null, [Validators.maxLength(500)]],

      participationStatusIdStaff: [null, [Validators.required]],
      commentStaff: [null, [Validators.maxLength(500)]],
    });

    this.form.patchValue({
      participationStatusIdPerformer: this.participationPerformer.participationStatusInner?.id,
      commentPerformer: this.participationPerformer.commentByPerformerInner,

      participationStatusIdStaff: this.participationStaff.participationStatusInternal?.id,
      commentStaff: this.participationStaff.commentByStaffInner,
    });
  }

   onSubmit() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.ref.close({ ...this.form.value });
  }

   cancel() {
    this.ref.close(null);
  }
}
