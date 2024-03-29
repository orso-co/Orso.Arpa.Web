import { PersonDto } from '@arpa/models';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NotificationsService, MeService, SelectValueService } from '@arpa/services';

@Component({
  selector: 'arpa-user-basedata',
  templateUrl: './user-basedata.component.html',
  styleUrls: ['./user-basedata.component.scss'],
})
export class UserBasedataComponent implements OnInit, OnChanges {
  public form: UntypedFormGroup;
  genderSelectValue: any;
  @Input() email: string;
  @Input() displayName: string;
  @Input() person: PersonDto;

  constructor(
    formBuilder: UntypedFormBuilder,
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
    this.form.patchValue({
      ...changes.person.currentValue,
      genderId: changes.person?.currentValue.gender?.id,
      email: changes.email.currentValue,
    });
  }

  ngOnInit() {
    this.genderSelectValue = this.selectValueService.getPersonGenders();
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
