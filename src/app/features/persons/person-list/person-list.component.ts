import { SelectValueService } from 'src/app/shared/services/select-value.service';
import { PersonService } from '../services/person.service';
import { PersonLayoutComponent } from '../../person-dialog/person-layout/person-layout.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';
import { PersonsQuery } from './persons.graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { Observable, Subscription } from 'rxjs';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { ActivatedRoute, NavigationExtras, NavigationStart, Router } from '@angular/router';
import { filter, first,  map } from 'rxjs/operators';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { DocumentNode } from 'graphql';




@Component({
  selector: 'arpa-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
@Unsubscribe()
export class PersonListComponent implements OnInit {
  state: Observable<SelectItem>;
  query: DocumentNode = PersonsQuery;
  private routeEventsSubscription: Subscription = Subscription.EMPTY;

  columns: ColumnDefinition<PersonDto>[] = [
    { label: 'SURNAME', property: 'surname', type: 'text' },
    { label: 'GIVEN_NAME', property: 'givenName', type: 'text' },
    { label: 'EXPERIENCE_LEVEL', property: 'experienceLevel', type: 'rating', show: true },
    { label: 'RELIABILITY', property: 'reliability', type: 'rating', show: true },
    { label: 'GENERAL_PREFERENCE', property: 'generalPreference', type: 'rating', show: true },
    { label: 'CREATED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'CREATED_BY', property: 'createdBy', type: 'text', show: false },
    { label: 'MODIFIED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'MODIFIED_BY', property: 'modifiedBy', type: 'text', show: false },
  ];
  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    private dialogService: DialogService,
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService
    ) {}

  onRowClick(person: PersonDto) {
    this.router.navigate([{ outlets: { modal: ['detail', person.id] } }], {
      relativeTo: this.route,
    });
  }

  public openPersonDetailDialog(selection: PersonDto | null): void {
    const ref = this.dialogService.open(PersonLayoutComponent, {
      data: {
        person: selection ? selection : null,
        gender: this.selectValueService.load('Person', 'Gender').pipe(map(() => this.selectValueService.get('Person', 'Gender'))),
      },
      header: selection ? this.translate.instant('persons.EDIT_PERSON') : this.translate.instant('persons.ADD_NEW_PERSON'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });
    ref.onClose.pipe(first()).subscribe((person: PersonDto) => {
      if(!selection && person) {
        this.saveNewPerson(person);
      }
    });
  }

  private saveNewPerson(person: PersonDto): void {
    this.personService.create(person).subscribe((result) => {
      this.feedSource.refresh();
      this.notificationsService.success('persons.PERSON_CREATED');
    });
  }

  ngOnInit() {
    this.routeEventsSubscription = this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        map(() => this.router.getCurrentNavigation()?.extras as NavigationExtras)
      )
      .subscribe(({ state }) => {
        if (state && state.refresh) {
          this.feedSource.refresh();
        }
      });
  }
}
