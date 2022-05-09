import { ProjectParticipationDto } from '../../../../@arpa/models/projectParticipationDto';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { ReducedPersonDto } from '../../../../@arpa/models/reducedPersonDto';

@Component({
  selector: 'arpa-participation-dialog',
  templateUrl: './participation-dialog.component.html',
  styleUrls: ['./participation-dialog.component.scss'],
})
export class ParticipationDialogComponent implements OnInit {
  form: FormGroup;
  public participationStatusInner: Observable<SelectItem[]>;
  public participationStatusInternal: Observable<SelectItem[]>;
  public participation: ProjectParticipationDto;
  public commentByPerformerInner: any;
  public projectTitle: string;
  public person: ReducedPersonDto;
  public personName: any;

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
    this.projectTitle = this.config.data.title;
    this.participation = this.config.data.projectParticipations[0];
    this.commentByPerformerInner = this.participation.commentByPerformerInner;
    this.personName = this.config.data.participation.person.surname;

    this.form = this.formBuilder.group({
      participationStatusInnerId: [null],
      participationStatusInternalId: [null, [Validators.required]],
      commentByStaffInner: [null, [Validators.maxLength(500)]],
      commentTeam: [null, [Validators.maxLength(500)]],
      invitationStatusId: [null, [Validators.required]],
      musicianProfileId: [null, [Validators.required]],
    });

    this.form.patchValue({
      commentByStaffInner: this.participation.commentByStaffInner,
      commentTeam: this.participation.commentTeam,
      participationStatusInnerId: this.participation.participationStatusInnerId,
      participationStatusInternalId: this.participation.participationStatusInternalId,
      invitationStatusId: this.participation.invitationStatusId,
      musicianProfileId: this.participation.musicianProfile?.id,
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
