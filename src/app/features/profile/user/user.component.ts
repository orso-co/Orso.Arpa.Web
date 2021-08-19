import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../core/services/notifications.service';
import { first, map } from 'rxjs/operators';
import { MeService } from '../../../core/services/me.service';
import { SelectValueService } from '../../../core/services/select-value.service';
import { MyUserProfileDto } from '../../../model/myUserProfileDto';
import { Apollo, gql } from 'apollo-angular';

const CurrentUserForProfile = gql`
  query {
  musicianProfiles(first: 3) {
    edges {node{isMainProfile}}
  }
}`;

@Component({
  selector: 'arpa-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public form: FormGroup;
  public profile: MyUserProfileDto;
  genderSelectValue: any;

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private meService: MeService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService,
    private apollo: Apollo,
  ) {
    this.apollo.watchQuery<any>({
      query: CurrentUserForProfile,
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);
      });
    this.genderSelectValue = this.selectValueService.load('Person', 'gender')
      .pipe(map(() => this.selectValueService.get('Person', 'gender')));

    this.form = formBuilder.group({
      genderId: [null, [Validators.required]],
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
