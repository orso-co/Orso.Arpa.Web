import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { first, map, switchMap } from 'rxjs/operators';
import { MeService } from '../../../shared/services/me.service';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { AuthService } from '../../../../@arpa/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arpa-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public displayName: string = '';
  genderSelectValue: any;
  private personSubscription: Subscription = Subscription.EMPTY;

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private meService: MeService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService,
  ) {
    this.genderSelectValue = this.selectValueService.load('Person', 'gender')
      .pipe(map(() => this.selectValueService.get('Person', 'gender')));

    this.form = formBuilder.group({
      genderId: [null],
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
    this.personSubscription = this.authService.currentUser.pipe(switchMap(token => {
      return this.route.data.pipe(map(({ profile }) => {
        const { person, email } = profile;
        return { person, displayName: token.displayName, email };
      }));
    })).subscribe(({ person, displayName, email }) => {
      this.displayName = displayName;
      this.form.patchValue({
        ...person,
        genderId: person.gender.id,
        email,
      });
    });
    this.form.controls.email.disable();
  }

  ngOnDestroy() {
    this.personSubscription.unsubscribe();
  }

  submit(): void {
    this.meService.putProfile(Object.assign({}, this.form.getRawValue())).pipe(first()).subscribe((response) => {
      this.notificationsService.success('USER_PROFILE_UPDATED', 'profile');
    }, error => {
      this.notificationsService.error('USER_PROFILE_UPDATE_ERROR', 'profile');
    });
  }
}
