import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

export interface FeedScope {
  values: any,
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
  variables: Record<string, any>;

  @Input()
  contentTemplate: TemplateRef<any>;
  public values = new Subject();
  public scope: FeedScope = {
    values: this.transformedValues,
  };
  private feedQuery: QueryRef<any, Record<string, any>>;
  private feedSubscription: Subscription;
  private cursor: string;

  constructor(private apollo: Apollo) {
  }

  get transformedValues(): any {
    return this.values.pipe(map((result): any => result));
  }

  flattenGraph(data: any) {
    if (!data) {
      return null;
    }
    const result: Record<string, any> = {};
    Object.keys(data).forEach(k => {
      if (data[k] && data[k].edges) {
        if (data[k].pageInfo) {
          result['pageInfo'] = {
            ...data[k].pageInfo,
            type: k,
          };
        }
        result[k] = data[k].edges.map((edge: any) => this.flattenGraph(edge.node));
      } else if (this.isObject(data[k])) {
        result[k] = this.flattenGraph(data[k]);
      } else {
        result[k] = data[k];
      }
    });
    return result;
  }

  ngOnInit(): void {
    this.feedQuery = this.apollo.watchQuery<any>({
      query: this.query,
      variables: {
        cursor: null,
        searchQuery: 'a',
        ...this.variables,
      },
    });

    this.feedSubscription = this.feedQuery.valueChanges.subscribe(({ data, loading }) => {
      const flattened = this.flattenGraph(data) || {};
      if (Array.isArray(flattened)) {
        this.values.next(data);
      } else if (flattened.pageInfo) {
        this.cursor = flattened.pageInfo.endCursor;
        this.values.next(flattened[flattened.pageInfo.type]);
      }
    });
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

  private isObject(obj: any) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }

}
