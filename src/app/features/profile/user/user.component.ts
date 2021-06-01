import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { NotificationsService } from '../../../core/services/notifications.service';
import { first } from 'rxjs/operators';
import { MeService } from '../../../core/services/me.service';
import { IUserProfileDto } from '../../../models/IUserProfileDto';

@Component({
  selector: 'arpa-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public form: FormGroup;
  public profile: IUserProfileDto;

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private meService: MeService,
    private notificationsService: NotificationsService,
  ) {
    this.form = formBuilder.group({
      email: [null],
      phoneNumber: [null,
        [
          Validators.minLength(1),
          Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
        ],
      ],
      givenName: [
        null,
      ],
      surname: [
        null,
      ],
      aboutMe: [
        null,
      ],
    });
  }

  ngOnInit(): void {
    this.profile = this.route.snapshot.data.profile;
    this.form.patchValue(this.profile);
    this.form.controls.email.disable();
  }

  submit(): void {
    this.meService.putProfile(Object.assign({}, this.form.getRawValue())).pipe(first()).subscribe((response) => {
      this.notificationsService.success('Profile updated.');
    }, error => {
      this.notificationsService.error('Could not update Profile.');
    });
  }
}
