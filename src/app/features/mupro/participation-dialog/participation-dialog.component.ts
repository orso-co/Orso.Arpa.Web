import { ProjectParticipationDto } from './../../../../@arpa/models/projectParticipationDto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectDto } from 'src/@arpa/models/projectDto';

@Component({
  selector: 'arpa-participation-dialog',
  templateUrl: './participation-dialog.component.html',
  styleUrls: ['./participation-dialog.component.scss']
})
export class ParticipationDialogComponent {
  projects: ProjectDto[] = this.config.data.projects;
  participation: ProjectParticipationDto [] = this.config.data.participation;
  musicianProfileId: string = this.config.data.musicianProfileId;
  form: FormGroup;

  constructor(
    public config: DynamicDialogConfig,
    formBuilder: FormBuilder,
    private ref: DynamicDialogRef) {
    this.form = formBuilder.group({
      participation: [[], [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.ref.close({ ...this.form.value });
  }

  public cancel(): void {
    this.ref.close(null);
  }
}
