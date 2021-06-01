import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMusicianProfileDto } from '../../../models/appointment';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { ISectionDto } from '../../../models/section';

@Component({
  selector: 'arpa-project-participation',
  templateUrl: './project-participation.component.html',
  styleUrls: ['./project-participation.component.scss'],
})
export class ProjectParticipationComponent implements OnInit {

  public form: FormGroup;
  public musicianProfiles: Observable<SelectItem[]> = this.config.data.musicianProfiles.pipe(
    concatMap((profiles: IMusicianProfileDto[]) => this.sections.pipe(
      map((sections: any) => profiles.map((profile: IMusicianProfileDto) => {
          const find = sections.find((section: ISectionDto) => section.id === profile.instrumentId);
          return { label: find.name, value: profile.id} as SelectItem;
        })),
      ),
    ));

  public sections: Observable<ISectionDto> = this.config.data.sections;
  public projectParticipation: Observable<any[]> = this.config.data.projectParticipation;

  constructor(
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
  ) {

  }

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
