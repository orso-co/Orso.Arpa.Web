import { PersonLayoutComponent } from './../../person-dialog/person-layout/person-layout.component';
import { SelectItem } from 'primeng/api';
import { PersonDialogEntryComponent } from './../../person-dialog/person-dialog-entry/person-dialog-entry.component';
import { SelectValueService } from './../../../shared/services/select-value.service';
import { MeService } from './../../../shared/services/me.service';
import { NotificationsService } from './../../../../@arpa/services/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from './../services/person.service';
import { PersonDto } from './../../../../@arpa/models/personDto';
import { Component, ViewChild } from '@angular/core';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';
import { PersonsQuery } from './persons.graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { first, map } from 'rxjs/operators';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { Observable } from 'rxjs';



@Component({
  selector: 'arpa-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})

@Unsubscribe()
export class PersonListComponent {

  state: Observable<SelectItem>
  query = PersonsQuery;

  columns: ColumnDefinition<PersonDto>[] = [
    { label: 'SURNAME', property: 'surname', type: 'text' },
    { label: 'GIVEN_NAME', property: 'givenName', type: 'text' },
    { label: 'EXPERIENCE_LEVEL', property: 'experienceLevel', type: 'text', show: true },
    { label: 'RELIABILITY', property: 'reliability', type: 'text', show: true },
    { label: 'GENERAL_PREFERENCE', property: 'generalPreference', type: 'text', show: true },
    { label: 'CREATED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'CREATED_BY', property: 'createdBy', type: 'text', show: false },
    { label: 'MODIFIED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'MODIFIED_BY', property: 'modifiedBy', type: 'text', show: false },
  ];
  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    public translate: TranslateService,
    private personService: PersonService,
    private notificationsService: NotificationsService,
    private meService: MeService,
    private selectValueService: SelectValueService,

  ) {

  }


  public openPersonDialog(selection: PersonDto | null): void {
    const ref = this.dialogService.open(PersonLayoutComponent, {
      data: {
        person: selection ? selection : null,
      },
      header: selection ? this.translate.instant('person.EDIT_PERSON') : this.translate.instant('person.NEW_PERSON'),
      styleClass: 'form-modal', width: '66%',
    });
    ref.onClose
      .pipe(first())
      .subscribe((person: PersonDto) => {
        if (!selection && person) {
          this.saveNewPerson(person);
        } else if (selection && person) {
          this.updatePerson(person, selection);
        }
      });
  }
  onRowClick(event: PersonDto) {
    this.openPersonDialog(event);
  }

  private saveNewPerson (person: PersonDto): void {
    this.personService.create(person)
    .subscribe((result) => {
      this.feedSource.refresh();
      this.notificationsService.success('person.PERSON_CREATED');
    });
  }
  private updatePerson(person: PersonDto, oldPerson: PersonDto): void {
    this.personService.update(person)
      .subscribe(() => {
        this.feedSource.refresh();
        this.notificationsService.success('person.PERSON_UPDATED');
      });
  }
}
