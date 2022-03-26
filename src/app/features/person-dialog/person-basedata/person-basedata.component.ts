import { NotificationsService } from './../../../../@arpa/services/notifications.service';
import { PersonService } from './../../persons/services/person.service';
import { ReducedPersonDto } from './../../../../@arpa/models/reducedPersonDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectValueService } from './../../../shared/services/select-value.service';
import { PersonDto } from './../../../../@arpa/models/personDto';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { first, map, filter } from 'rxjs/operators';

@Component({
  selector: 'arpa-person-basedata',
  templateUrl: './person-basedata.component.html',
  styleUrls: ['./person-basedata.component.scss'],
})
export class PersonBasedataComponent implements OnInit, OnChanges {
  @Input() person: PersonDto | null;
  @Output() personSaved: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;
  public genderOptions$: Observable<SelectItem[]>;
  public filteredPersons: ReducedPersonDto[] = [];

  constructor(
    formBuilder: FormBuilder,
    private selectValueService: SelectValueService,
    private personService: PersonService,
    private notificationService: NotificationsService
  ) {
    this.form = formBuilder.group({
      genderId: [null, [Validators.required]],
      givenName: [null, [Validators.required, Validators.maxLength(50)]],
      surname: [null, [Validators.required, Validators.maxLength(50)]],
      birthName: [null, [Validators.maxLength(50)]],
      aboutMe: [null, [Validators.required, Validators.maxLength(1000)]],
      birthplace: [null, [Validators.maxLength(50)]],
      dateOfBirth: [null],
      experienceLevel: [0],
      reliability: [0],
      generalPreference: [0],
      contactVia: [null],
    });
  }

  ngOnInit() {
    this.genderOptions$ = this.selectValueService.load('Person', 'gender').pipe(map(() => this.selectValueService.get('Person', 'gender')));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const person: PersonDto = changes.person.currentValue;
    this.form.patchValue({
      ...person,
      genderId: person.gender?.id,
      dateOfBirth: person.dateOfBirth ? new Date(person.dateOfBirth) : null,
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const value = { ...this.form.value, contactViaId: this.form.controls.contactVia.value?.id };
    delete value.contactVia;
    this.personService
      .update(this.person!.id!, value)
      .pipe(first())
      .subscribe(() => {
        this.notificationService.success('PERSON_MODIFIED', 'persons');
        this.personSaved.emit();
      });
  }

  filterPersons(event: { query: string }) {
    this.personService
      .searchPerson(event.query)
      .pipe(
        first(),
        map((result) => result.filter((person: any) => person.id !== this.person?.id))
      )
      .subscribe((result) => (this.filteredPersons = result));
  }
}
