import { MyProjectParticipationDto } from '@arpa/models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'arpa-my-project-participation-dialog',
  templateUrl: './my-project-participation-dialog.component.html',
  styleUrls: ['./my-project-participation-dialog.component.scss'],
})
export class MyProjectParticipationDialogComponent implements OnInit {
  form: FormGroup;
  participation: MyProjectParticipationDto = this.config.data.participation;
  statusOptions$: Observable<SelectItem[]> = this.config.data.statusOptions$;

  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      participationStatus: [null, [Validators.required]],
      comment: [null, [Validators.maxLength(500)]],
    });

    this.form.patchValue({
      participationStatus: this.participation.participationStatusInner,
      comment: this.participation.commentByPerformerInner,
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
