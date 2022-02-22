import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ProjectDto } from '../../../../@arpa/models/projectDto';

@Component({
  selector: 'arpa-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.scss'],
})
export class InvitationDialogComponent {
  projects: ProjectDto[] = this.config.data.projects;
  musicianProfileId: string = this.config.data.musicianProfileId;
  form: FormGroup;

  constructor(public config: DynamicDialogConfig, formBuilder: FormBuilder, private ref: DynamicDialogRef) {
    this.form = formBuilder.group({
      projects: [[], [Validators.required]],
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
