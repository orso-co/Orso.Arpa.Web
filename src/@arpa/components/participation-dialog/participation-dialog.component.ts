import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EnumService } from '@arpa/services';
import { ReducedPersonDto, ProjectParticipationDto, ReducedMusicianProfileDto } from '@arpa/models';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'arpa-participation-dialog',
  templateUrl: './participation-dialog.component.html',
  styleUrls: ['./participation-dialog.component.scss'],
})
export class ParticipationDialogComponent implements OnInit {
  form: FormGroup;
  public participation: ProjectParticipationDto;
  public commentByPerformerInner: any;
  public projectTitle: string;
  public person: ReducedPersonDto | null;
  participationStatusInnerOptions$: Observable<SelectItem[]>;
  participationStatusInternalOptions$: Observable<SelectItem[]>;
  public instrumentName: ReducedMusicianProfileDto;

  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private enumService: EnumService
  ) {
  }

  ngOnInit() {
    this.projectTitle = this.config.data.project.title;
    this.participation = this.config.data.project.projectParticipations.find((participation: any) => participation.musicianProfile.person.id === this.config.data.personId);
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
      return;
    }
    this.ref.close({ ...this.participation, ...this.form.value });
  }

  cancel() {
    this.ref.close(null);
  }
}
