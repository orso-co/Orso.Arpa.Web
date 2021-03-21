import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeService } from 'src/app/services/me.service';
import { IUserProfileDto } from 'src/app/models/IUserProfileDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'arpa-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  userProfile: IUserProfileDto;
  profileFormGroup: FormGroup;

  constructor(private meService: MeService,
              private router: Router,
              private fb: FormBuilder,
              private toastService: ToastService
  ) {
    this.profileFormGroup = this.fb.group({
      userName : [{value: '', disabled: true}],
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
    this.router.navigate(['/pages/dashboard']);
  }

  onSubmit(): void {
    this.subs.add(this.meService.putProfile(this.userProfile).subscribe(data => {
      if (data == null ) {
        this.toastService.info('profile.UPDATE');
      }
      else {
        this.toastService.error('profile.ISSUE');
      }
    }
    ));
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }
}
