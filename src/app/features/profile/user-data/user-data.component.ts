import { PersonDto } from './../../../../@arpa/models/personDto';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { NotificationsService } from 'src/@arpa/services/notifications.service';
import { MeService } from 'src/app/shared/services/me.service';
import { SelectValueService } from 'src/app/shared/services/select-value.service';

@Component({
  selector: 'arpa-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit, OnChanges {
  public form: FormGroup;
  genderSelectValue: any;
  @Input() email: string;
  @Input() displayName: string;
  @Input() person: PersonDto;

  constructor(
    formBuilder: FormBuilder,
    private selectValueService: SelectValueService,
    private meService: MeService,
    private notificationsService: NotificationsService
  ) {
    this.form = formBuilder.group({
      genderId: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      givenName: [null, [Validators.required, Validators.maxLength(50)]],
      surname: [null, [Validators.required, Validators.maxLength(50)]],
      birthName: [null, [Validators.maxLength(50)]],
      aboutMe: [null, [Validators.maxLength(1000)]],
      birthplace: [null, [Validators.maxLength(50)]],
      dateOfBirth: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.form.patchValue({
      ...changes.person.currentValue,
      genderId: changes.person?.currentValue.gender?.id,
      email: changes.email.currentValue,
    });
  }

  ngOnInit() {
    this.genderSelectValue = this.selectValueService
      .load('Person', 'gender')
      .pipe(map(() => this.selectValueService.get('Person', 'gender')));
  }

  submit(): void {
    this.meService
      .putProfile(Object.assign({}, this.form.getRawValue()))
      .pipe(first())
      .subscribe(
        (response) => {
          this.notificationsService.success('USER_PROFILE_UPDATED', 'profile');
        },
        (error) => {
          this.notificationsService.error('USER_PROFILE_UPDATE_ERROR', 'profile');
        }
      );
  }
}