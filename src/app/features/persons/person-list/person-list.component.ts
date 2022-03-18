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
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'arpa-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
@Unsubscribe()
export class PersonListComponent implements OnInit {
  state: Observable<SelectItem>;
  query = PersonsQuery;
  private routeEventsSubscription: Subscription = Subscription.EMPTY;

  columns: ColumnDefinition<PersonDto>[] = [
    { label: 'SURNAME', property: 'surname', type: 'text' },
    { label: 'GIVEN_NAME', property: 'givenName', type: 'text' },
    { label: 'ID', property: 'id', type: 'text', show: false },
    { label: 'ABOUTME', property: 'aboutMe', type: 'text', show: false },
    { label: 'EXPERIENCE_LEVEL', property: 'experienceLevel', type: 'rating', show: true },
    { label: 'RELIABILITY', property: 'reliability', type: 'rating', show: true },
    { label: 'GENERAL_PREFERENCE', property: 'generalPreference', type: 'rating', show: true },
    { label: 'CREATED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'CREATED_BY', property: 'createdBy', type: 'text', show: false },
    { label: 'MODIFIED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'MODIFIED_BY', property: 'modifiedBy', type: 'text', show: false },
  ];
  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(public translate: TranslateService, private router: Router, private route: ActivatedRoute) {}

  onRowClick(person: PersonDto) {
    this.router.navigate([{ outlets: { modal: ['detail', person.id] } }], {
      relativeTo: this.route,
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
