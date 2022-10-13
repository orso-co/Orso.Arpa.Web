import { NotificationsService } from '../../../../../@arpa/services/notifications.service';
import { PersonService } from '../../services/person.service';
import { ReducedPersonDto } from '../../../../../@arpa/models/reducedPersonDto';
import { SelectValueService } from '../../../../shared/services/select-value.service';
import { PersonDto } from '../../../../../@arpa/models/personDto';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
  showButton = 0;
  selectOptions = [
    {id: false, name: 'persons.DONT_DELETE_PERSON'},
    {id: true, name: 'persons.DELETE_PERSON_NOW'}
  ]
  selectedOption: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private selectValueService: SelectValueService,
    private personService: PersonService,
    private notificationService: NotificationsService,
    public ref: DynamicDialogRef,

) {
    this.form = formBuilder.group({
      genderId: [null, [Validators.required]],
      givenName: [null, [Validators.required, Validators.maxLength(50)]],
      surname: [null, [Validators.required, Validators.maxLength(50)]],
      birthName: [null, [Validators.maxLength(50)]],
      aboutMe: [null, [Validators.maxLength(1000)]],
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
    if (person) {
      this.form.patchValue({
        ...person,
        genderId: person.gender?.id,
        dateOfBirth: person.dateOfBirth ? new Date(person.dateOfBirth) : null,
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const value = { ...this.form.value, contactViaId: this.form.controls.contactVia.value?.id };
    delete value.contactVia;
    if (!this.person?.id) {
      this.personService.create(this.form.value)
        .pipe(first())
        .subscribe((person) => {
          this.notificationService.success('PERSON_CREATED', 'persons');
          this.personSaved.emit(person);
          this.form.markAsPristine();
        })
    } else {
      this.personService
        .update(this.person!.id!, value)
        .pipe(first())
        .subscribe(() => {
          this.notificationService.success('PERSON_MODIFIED', 'persons');
          this.personSaved.emit();
        });
    }
  }
  onSelectedOptionChange(event: {value: number}) {
  }

  public deletePerson(): void {
    if (this.person?.id){
    this.personService.delete(this.person.id).subscribe(() => {
      this.notificationService.success('persons.PERSON_DELETED');
      this.ref.close(this.person?.id);
    });
  }}

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
