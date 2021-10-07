import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProjectDto } from '../../models/projectDto';
import { PrimeTemplate } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { FeedScope } from '../graph-ql-feed/graph-ql-feed.component';

export interface ColumnDefinition<T> {
  label: string,
  property: keyof T | string;
  type: 'text' | 'date' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'template';
  visible?: boolean,
  cssClasses?: string[];
  template?: string;
}

/**
 * Template directive which holds a widget configuration.
 */
@Directive({
  selector: '[arpaTableColumn]',
})
export class ArpaTableColumnDirective {
  @Input('arpaTableColumn')
  name: string;

  constructor(public template: TemplateRef<any>) {
  }
}

@Component({
  selector: 'arpa-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input()
  showFilter: boolean = true;

  @Input()
  rows: number = 10;

  @Input()
  rowsPerPage: number[] = [10, 25, 50];

  @Input()
  showPagination: boolean = true;

  @Input()
  data: Observable<any[]>;

  @Input()
  feed: FeedScope;

  @Input()
  filterFields: string[] = [];

  @Input()
  primaryKey: string = 'id';

  @Input()
  scrollHeight: string = 'flex';

  @Input()
  scrollable: boolean = true;

  @Input()
  columns: ColumnDefinition<ProjectDto>[] = [];

  @Output()
  filterEvents: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  paginationEvents: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  lazyEvents: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  rowSelectEvents: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  rowClickEvents: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  actionsTemplateRef: TemplateRef<any>;

  @Input()
  isLoading: boolean;

  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  public isMobile: Observable<boolean>;
  public lazy: boolean = false;
  @ContentChildren(ArpaTableColumnDirective, { read: ArpaTableColumnDirective }) private columnTemplateRefs: QueryList<ArpaTableColumnDirective>;
  private columnTemplates: Record<string, TemplateRef<any>> = {};
  private loadingEventSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef) {
    this.isMobile = breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small]).pipe(map(({ matches }) => matches));
  }

  ngOnInit(): void {
    if (this.feed) {
      this.isLoading = true;
      this.loadingEventSubscription = this.feed.isLoading.subscribe(v => this.isLoading = v);
      this.lazy = true;
      this.data = this.feed.values;
    }
    if (this.filterFields.length === 0) {
      this.columns.forEach(def => {
        this.filterFields.push(def.property);
      });
    }
  }

  trackByProperty<T>(index: number, column: ColumnDefinition<T>) {
    return column.property;
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'actions':
          this.actionsTemplateRef = item.template;
          break;
      }
    });
    this.columnTemplateRefs.forEach((item) => {
      this.columnTemplates[item.name] = item.template;
      this.cdRef.detectChanges();
    });
  }

  getTemplate(template: string) {
    return this.columnTemplates[template];
  }

  ngOnDestroy(): void {
    if (this.loadingEventSubscription) {
      this.loadingEventSubscription.unsubscribe();
    }
  }

}
