import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMusicianProfileDto } from '../../../models/appointment';
import { ISectionDto } from '../../../models/section';
import { Observable } from 'rxjs';

@Component({
  selector: 'arpa-edit-musician-profile',
  templateUrl: './edit-musician-profile.component.html',
  styleUrls: ['./edit-musician-profile.component.scss'],
})
export class EditMusicianProfileComponent implements OnInit {

  public form: FormGroup;

  public profile: IMusicianProfileDto = this.config.data.profile;
  public sections: Observable<ISectionDto[]> = this.config.data.sections;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      levelAssessmentPerformer: [1, [Validators.min(1), Validators.max(6)]],
      instrumentId: [null, [Validators.required]],
      doublingInstruments: [null, []],
      preferredPartsPerformer: [null, []],
    });

    if (this.profile) {
      this.form.patchValue(this.profile);
    }
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.ref.close({ ...this.profile, ...this.form.value } as IMusicianProfileDto);
  }

  cancel(): void {
    this.ref.close(null);
  }
}
