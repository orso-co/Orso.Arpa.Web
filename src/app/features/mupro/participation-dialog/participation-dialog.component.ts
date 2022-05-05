import { ProjectParticipationDto } from '../../../../@arpa/models/projectParticipationDto';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectValueService } from '../../../shared/services/select-value.service';

@Component({
  selector: 'arpa-participation-dialog',
  templateUrl: './participation-dialog.component.html',
  styleUrls: ['./participation-dialog.component.scss'],
})
export class ParticipationDialogComponent implements OnInit {
  form: FormGroup;
  private participation: ProjectParticipationDto;
  public participationStatusInner: Observable<SelectItem[]>;
  public participationStatusInternal: Observable<SelectItem[]>;

  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private translate: TranslateService,
    private selectValueService: SelectValueService,
  ) {
    this.participationStatusInner = this.selectValueService.load('ProjectParticipation', 'ParticipationStatusInner').pipe(map(() => this.selectValueService.get('ProjectParticipation', 'ParticipationStatusInner')));
    this.participationStatusInternal = this.selectValueService.load('ProjectParticipation', 'ParticipationStatusInternal').pipe(map(() => this.selectValueService.get('ProjectParticipation', 'ParticipationStatusInternal')));
  }

  ngOnInit() {

    this.participation = this.config.data.projectParticipations[0];
    this.form = this.formBuilder.group({
      participationStatusInnerId: [null],
      participationStatusInternalId: [null, [Validators.required]],
      commentByPerformerInner: [null, [Validators.maxLength(500)]],
      commentByStaffInner: [null, [Validators.maxLength(500)]],
      commentTeam: [null, [Validators.maxLength(500)]],
    });
    this.form.patchValue({
      commentByPerformerInner: this.participation.commentByPerformerInner,
      commentByStaffInner: this.participation.commentByStaffInner,
      commentTeam: this.participation.commentTeam,
      participationStatusInnerId: this.participation.participationStatusInnerId,
      participationStatusInternalId: this.participation.participationStatusInternalId,
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
