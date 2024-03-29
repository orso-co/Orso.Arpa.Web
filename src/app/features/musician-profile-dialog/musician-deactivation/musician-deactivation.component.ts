import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MusicianProfileDto } from '@arpa/models';
import { first } from 'rxjs/operators';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MusicianService } from '../services/musician.service';
import { NotificationsService } from '@arpa/services';

@Component({
  selector: 'arpa-musicianprofile-deactivation',
  templateUrl: './musician-deactivation.component.html',
  styleUrls: ['./musician-deactivation.component.scss'],
})
export class MusicianDeactivationComponent implements OnInit {
  public form: UntypedFormGroup;

  public profile: MusicianProfileDto;
  public minDate: Date;

  constructor(
    public config: DynamicDialogConfig,
    private formBuilder: UntypedFormBuilder,
    private musicianService: MusicianService,
    public ref: DynamicDialogRef,
    private notificationsService: NotificationsService
  ) {
    this.config.data.profile.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.profile = profile;
    });
  }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = new Date(today.setDate(today.getDate() + 1));

    this.form = this.formBuilder.group({
      deactivationStart: [null, [Validators.required]],
      purpose: [null],
    });

    if (this.profile && this.profile.deactivation) {
      if (this.profile.deactivation.deactivationStart) {
        this.profile.deactivation.deactivationStart = new Date(this.profile.deactivation.deactivationStart);
      }
      this.form.patchValue(this.profile.deactivation);
    }
  }

  activate() {
    this.musicianService
      .activateProfile(this.profile.id)
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.success('ACTIVATED', 'musicianprofile-dialog');
        this.ref.close();
      });
  }

  deactivate() {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.musicianService
      .deactivateProfile(this.profile.id, { ...this.form.value })
      .pipe(first())
      .subscribe((result) => {
        this.notificationsService.success('DEACTIVATED', 'musicianprofile-dialog');
        this.ref.close();
      });
  }
}
