import { ProjectParticipationDto } from './../../../../@arpa/models/projectParticipationDto';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
@Component({
  selector: 'arpa-participation-dialog',
  templateUrl: './participation-dialog.component.html',
  styleUrls: ['./participation-dialog.component.scss'],
})
export class ParticipationDialogComponent implements OnInit {
  form: FormGroup;
  participationPerformer: ProjectParticipationDto = this.config.data.participationPerformer;
  participationStaff: ProjectParticipationDto = this.config.data.participationStaff;
  statusOptionsPerformer$: Observable<SelectItem[]> = this.config.data.statusOptionsPerformer$;
  statusOptionsStaff$: Observable<SelectItem[]> = this.config.data.statusOptionsStaff$;


  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private translate: TranslateService
    ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      participationStatusInnerId: [null, [Validators.required]],
      commentByPerformerInner: [null, [Validators.maxLength(500)]],

      participationStatusInternalId: [null, [Validators.required]],
      commentByStaffInner: [null, [Validators.maxLength(500)]],
    });

    this.form.patchValue({
      participationStatusInnerId: this.participationPerformer.participationStatusInnerId,
      commentByPerformerInner: this.participationStaff.commentByPerformerInner,

      participationStatusInternalId: this.participationStaff.participationStatusInternalId,
      commentByStaffInner: this.participationStaff.commentByStaffInner,
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
