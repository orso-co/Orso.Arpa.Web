import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { MusicianProfileDto } from '@arpa/models';

@Component({
  selector: 'arpa-project-participation',
  templateUrl: './project-participation.component.html',
  styleUrls: ['./project-participation.component.scss'],
})
export class ProjectParticipationComponent implements OnInit {
  public form: UntypedFormGroup;
  public musicianProfiles: Observable<SelectItem[]> = this.config.data.musicianProfiles.pipe(
    map((profiles: MusicianProfileDto[]) =>
      profiles.map((profile: MusicianProfileDto) => {
        return { label: profile.instrument?.name, value: profile.id } as SelectItem;
      })
    )
  );
  public projectParticipation: Observable<any[]> = this.config.data.projectParticipation;

  constructor(private config: DynamicDialogConfig, private formBuilder: UntypedFormBuilder, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      musicianId: [null, [Validators.required]],
      statusId: [null, [Validators.required]],
      comment: [null, []],
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.ref.close(this.form.value as any);
  }

  cancel(): void {
    this.ref.close(null);
  }
}
