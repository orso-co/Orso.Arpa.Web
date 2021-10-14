import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface FeedScope {
  isLoading: EventEmitter<boolean>,
  totalCount: BehaviorSubject<number>,
  values: BehaviorSubject<any[]>,
}

@Component({
  selector: 'arpa-graph-ql-feed',
  templateUrl: './graph-ql-feed.component.html',
  styleUrls: ['./graph-ql-feed.component.scss'],
})
export class GraphQlFeedComponent implements OnInit, OnDestroy {

  @Input()
  query: DocumentNode;

  @Input()
  variables: Record<string, any> = {};

  @Input()
  contentTemplate: TemplateRef<any>;

  @Output()
  isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  public values = new BehaviorSubject<any[]>([]);
  public totalCount = new BehaviorSubject<number>(0);
  public scope: FeedScope = {
    isLoading: this.isLoading,
    totalCount: this.totalCount,
    values: this.values,
  };
  private feedQuery: QueryRef<any, Record<string, any>>;
  private feedSubscription: Subscription;
  private hasNextPage: boolean;
  private hasPreviousPage: boolean;

  constructor(private apollo: Apollo) {
    this.variables.take = this.variables.take ? this.variables.take : 10;
  }

  ngOnInit(): void {
    this.feedQuery = this.apollo.watchQuery<any>({
      query: this.query,
      variables: {
        searchQuery: '',
        ...this.variables,
      },
      notifyOnNetworkStatusChange: true,
      useInitialLoading: true,
    });

    this.feedSubscription = this.feedQuery.valueChanges.subscribe(({ data, loading }) => {
      this.isLoading.emit(loading);
      if (Array.isArray(data)) {
        this.values.next(data);
      } else if (data) {
        const type = Object.keys(data)[0];
        this.hasNextPage = data[type].pageInfo.hasNextPage;
        this.hasPreviousPage = data[type].pageInfo.hasPreviousPage;
        this.values.next(data[type].items);
        this.totalCount.next(data[type].totalCount);
      }
    });
  }

  refresh() {
    return this.feedQuery.refetch();
  }

  onFilter({ filter }: any) {
    return this.feedQuery.fetchMore({
      variables: {
        searchQuery: filter || '',
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return fetchMoreResult;
      },
    });
  }

  onLazy({ first, rows }: any) {
    this.moveCursor(rows, first);
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

  private moveCursor(take: number, skip: number = 0) {
    return this.feedQuery.fetchMore({
      variables: {
        take,
        skip,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return fetchMoreResult;
      },
    });
  }
}