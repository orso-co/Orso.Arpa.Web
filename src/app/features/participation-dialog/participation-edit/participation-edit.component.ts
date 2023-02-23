import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EnumService, NotificationsService, ProjectService } from '@arpa/services';
import { ReducedPersonDto, ProjectParticipationDto, ReducedMusicianProfileDto } from '@arpa/models';
import { SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'arpa-participation-edit',
  templateUrl: './participation-edit.component.html',
  styleUrls: ['./participation-edit.component.scss'],
})
export class ParticipationEditComponent implements OnInit {
  @Input() participation: ProjectParticipationDto;
  @Input() projectId: string;

  form: FormGroup;
  public commentByPerformerInner: any;
  public projectTitle: string;
  public person: ReducedPersonDto | null;
  participationStatusInnerOptions$: Observable<SelectItem[]>;
  participationStatusInternalOptions$: Observable<SelectItem[]>;
  public instrumentName: ReducedMusicianProfileDto;

  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private enumService: EnumService,
    private projectService: ProjectService,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit() {
    this.commentByPerformerInner = this.participation.commentByPerformerInner;
    const profile: any = this.participation.musicianProfile;
    this.person = profile.person;
    this.participationStatusInnerOptions$ = this.enumService.getProjectParticipationStatusInnerSelectItems();
    this.participationStatusInternalOptions$ = this.enumService.getProjectParticipationStatusInternalSelectItems();
    this.instrumentName = profile.instrumentName;

    this.form = this.formBuilder.group({
      participationStatusInner: [null],
      participationStatusInternal: [null, [Validators.required]],
      commentByStaffInner: [null, [Validators.maxLength(500)]],
      commentTeam: [null, [Validators.maxLength(500)]],
      musicianProfileId: [null, [Validators.required]],
    });

    this.form.patchValue({
      commentByStaffInner: this.participation.commentByStaffInner,
      commentTeam: this.participation.commentTeam,
      participationStatusInner: this.participation.participationStatusInner,
      participationStatusInternal: this.participation.participationStatusInternal,
      musicianProfileId: this.participation.musicianProfile?.id,
    });
  }

  getName(person: ReducedPersonDto | null) {
    return person ? `${person.givenName} ${person.surname}` : '';
  }

  onSubmit() {
    if (this.form.invalid || this.form.pristine) {
      this.notificationsService.error('FAILED_TO_UPDATE_PROJECT_PARTICIPATION');
      return;
    }

    const projectParticipation = { ...this.participation, ...this.form.value };
    if (projectParticipation) {
      this.projectService.setParticipation(this.projectId, projectParticipation)
        .pipe(first())
        .subscribe(() => {
          this.notificationsService.success('UPDATED_PROJECT_PARTICIPATION');
        });
    }
  }
}
