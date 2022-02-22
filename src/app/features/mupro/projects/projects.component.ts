import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { DocumentNode } from 'graphql';
import { ProjectsQuery } from './projects.graphql';
import { ActivatedRoute, NavigationExtras, NavigationStart, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { GraphQlFeedComponent } from 'src/@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'arpa-mupro-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  query: DocumentNode = ProjectsQuery;

  columns: ColumnDefinition<ProjectDto>[] = [
    { label: 'PROJECT', property: 'title', type: 'text' },
    { label: 'STATE', property: 'stateId', type: 'state', stateTable: 'Project', show: true },
    { label: 'DATE', property: 'startDate', type: 'date', show: true },
    { label: 'GENRE', property: 'genre.selectValue.name', type: 'text', show: true },
  ];

  personId: string | undefined;
  private routeEventsSubscription: Subscription = Subscription.EMPTY;
  private routeSubscription: Subscription = Subscription.EMPTY;

  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.personId = params.get('personId') || undefined;
      this.feedSource?.refresh();
    });

    this.routeEventsSubscription = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.feedSource.refresh();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.routeEventsSubscription.unsubscribe();
  }
}
