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
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PrimeTemplate, SelectItem } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, share } from 'rxjs/operators';
import { FeedScope } from '../graph-ql-feed/graph-ql-feed.component';
import { StateItem } from '../status-badge/state-badge.component';
import { SelectValueService } from '@arpa/services';

export interface ColumnDefinition<T extends Record<string, any>> {
  label: string;
  property: string | Extract<keyof T, string>;
  type: 'text' | 'date' | 'image' | 'badge' | 'state' | 'progress' | 'checkbox' | 'button' | 'template' | 'rating' | 'number' | 'avatar';
  show?: boolean;
  cssClasses?: string[];
  template?: string;
  hideFilter?: boolean;
  badgeStateMap?: StateItem[];
  // Required for type "state" because it's dynamically resolved.
  stateTable?: string;
  stateProperty?: string;
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

  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'arpa-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input()
  showFilter: boolean = true;

  @Input()
  columnFilter: boolean = true;

  @Input()
  rows: number = 20;

  @Input()
  rowsPerPage: number[] = [20, 50, 100, 200];

  @Input()
  showPagination: boolean = true;

  @Input()
  showJumpToPageDropdown: boolean = false;

  @Input()
  showFirstLastIcon: boolean = true;

  @Input()
  showPageLinks: boolean = true;

  @Input()
  data: Observable<any[]>;

  @Input()
  feed: FeedScope;

  @Input()
  values: Observable<any[]>;

  @Input()
  tableStyleClass: string;

  @Input()
  selectionMode: string;

  @Input()
  filterFields: string[] = [];

  @Input()
  primaryKey: string = 'id';

  @Input()
  scrollHeight: string = 'flex';

  @Input()
  scrollable: boolean = true;

  @Input()
  columns: ColumnDefinition<any>[] = [];

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
  rowTemplateRef: TemplateRef<any>;

  @Input()
  rowExpansionTemplateRef: TemplateRef<any>;

  @Input()
  isLoading: boolean;
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  public isMobile: Observable<boolean>;
  public lazy: boolean = false;
  public hasFilters: boolean = false;
  private stateStreams: Record<string, Observable<any>> = {};
  @ContentChildren(ArpaTableColumnDirective, { read: ArpaTableColumnDirective })
  private columnTemplateRefs: QueryList<ArpaTableColumnDirective>;
  private columnTemplates: Record<string, TemplateRef<any>> = {};
  private loadingEventSubscription: Subscription;
  private filterEventSubscription: Subscription;

  constructor(breakpointObserver: BreakpointObserver, private cdRef: ChangeDetectorRef, private selectValueService: SelectValueService) {
    this.isMobile = breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small]).pipe(map(({ matches }) => matches));
  }

  get activeColumns() {
    return this.columns.filter((column) => column.show ?? true);
  }

  get hasFilterColumns() {
    return this.columns.filter((column) => column.show !== undefined).length > 0;
  }

  resolveState(table: string, id: string, property: string = 'State') {
    const key = `${table}|${property}`;
    if (!this.stateStreams[key]) {
      this.stateStreams[key] = this.selectValueService.get(table, property).pipe(share());
    }
    return this.stateStreams[key].pipe(
      map((items: SelectItem[]) => {
        const item: any = items.find((i) => i.value === id);
        return item ? item.label.toLowerCase() : undefined;
      })
    );
  }

  resolveValue(path: any, source: any) {
    const props = path.split('.');
    return props.reduce((prev: Record<string, any>, current: string) => prev?.[current], source);
  }

  clear(table: any) {
    table.filterGlobal(null, 'contains');
    this.hasFilters = false;
  }

  ngOnInit(): void {
    this.filterEventSubscription = this.filterEvents.subscribe(() => {
      this.hasFilters = true;
    });
    if (this.feed) {
      this.isLoading = true;
      this.loadingEventSubscription = this.feed.isLoading.subscribe((v) => (this.isLoading = v));
      this.lazy = true;
      this.data = this.feed.values;
    } else if (this.values) {
      this.data = this.values;
    }
    if (this.filterFields.length === 0) {
      this.columns.forEach((def) => {
        this.filterFields.push(def.property);
      });
    }
  }

  trackByProperty<T>(index: number, column: ColumnDefinition<any>) {
    return column.property;
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      if (item.getType() === 'actions') {
        this.actionsTemplateRef = item.template;
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
    this.filterEventSubscription.unsubscribe();
    if (this.loadingEventSubscription) {
      this.loadingEventSubscription.unsubscribe();
    }
  }

  get exportColumns() {
    return this.columns.map((col) => ({ field: col.property, header: col.label }));
  }
}
