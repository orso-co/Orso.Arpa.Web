import { EnumService } from './../../../../@arpa/services/enum.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SetMyAppointmentParticipationPredictionDto } from '@arpa/models';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'arpa-my-appointment-participation-dialog',
  templateUrl: './my-appointment-participation-dialog.component.html',
  styleUrls: ['./my-appointment-participation-dialog.component.scss'],
})
export class MyAppointmentParticipationDialogComponent implements OnInit {
  form: UntypedFormGroup;
  participation: SetMyAppointmentParticipationPredictionDto = this.config.data.participation;
  statusOptions$: Observable<SelectItem[]> = this.config.data.statusOptions$;

  constructor(private formBuilder: UntypedFormBuilder, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      prediction: [null, [Validators.required]],
      commentByPerformerInner: [null, [Validators.maxLength(500)]],
    });

    this.form.patchValue(this.participation);
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
