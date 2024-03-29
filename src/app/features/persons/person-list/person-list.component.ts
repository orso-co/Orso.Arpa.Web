import { SelectValueService } from '@arpa/services';
import { PersonLayoutComponent } from '../person-dialog/person-layout/person-layout.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';
import { PersonsQuery } from './persons.graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { Observable, Subscription } from 'rxjs';
import { PersonDto } from '@arpa/models';
import { ActivatedRoute, NavigationExtras, NavigationStart, Router } from '@angular/router';
import { filter, first, map } from 'rxjs/operators';
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
    { label: '', property: '', type: 'avatar' },
    { label: 'SURNAME', property: 'surname', type: 'text' },
    { label: 'GIVEN_NAME', property: 'givenName', type: 'text' },
    { label: 'ABOUT_ME', property: 'aboutMe', type: 'text', show: true },
    { label: 'BACKGROUND', property: 'personBackgroundTeam', type: 'text', show: true },
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
        person: selection ?? null,
        gender: this.selectValueService.getPersonGenders(),
      },
      header: selection ? this.translate.instant('persons.EDIT_PERSON') : this.translate.instant('persons.ADD_NEW_PERSON'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });
    ref.onClose.pipe(first()).subscribe(() => {
      this.feedSource.refresh();
    });
  }

  ngOnInit() {
    this.routeEventsSubscription = this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        map(() => this.router.getCurrentNavigation()?.extras as NavigationExtras)
      )
      .subscribe(({ state }) => {
        if (state?.refresh) {
          this.feedSource.refresh();
        }
      });
  }
}
