import {Component, OnInit} from '@angular/core';
import {NotificationsService} from '../../core/services/notifications.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IUserProfileDto} from '../../models/IUserProfileDto';
import {SubSink} from 'subsink';
import {MeService} from '../../core/services/me.service';

@Component({
  selector: 'arpa-appointments',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private subs = new SubSink();
  userProfile: IUserProfileDto;
  profileFormGroup: FormGroup;

  constructor(private meService: MeService,
              private router: Router,
              private fb: FormBuilder,
              private notificationsService: NotificationsService
  ) {
    this.profileFormGroup = this.fb.group({
      userName: [{value: '', disabled: true}],
      givenName: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern('[- +()0-9]+')]
    });
  }

  ngOnInit(): void {
    this.subs.add(this.meService.getMyProfile().subscribe(data => {
      this.userProfile = data;
      this.profileFormGroup.setValue(this.userProfile);
    }));

    this.subs.add(this.profileFormGroup.valueChanges.subscribe(data => {
      this.userProfile = data;
    }));
  }

  // workaround to display formGroup fields in original order
  returnZero(): number {
    return 0;
  }

  goToDashboard(): void {
    this.router.navigate(['/arpa/dashboard']);

  }

  onSubmit(): void {
    this.subs.add(this.meService.putProfile(this.userProfile).subscribe(data => {
        if (data == null) {
          this.notificationsService.info('profile.UPDATE');
        } else {
          this.notificationsService.error('profile.ISSUE');
        }
      }
    ));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
