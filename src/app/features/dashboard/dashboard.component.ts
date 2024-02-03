import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Directive,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService, MeService, LoadingService } from '@arpa/services';
import { MenuItem } from 'primeng/api';
import { WidgetComponent } from './widget/widget.component';
import { dashboards, widgets } from './dashboard.config';

/**
 * Represents a card layout that defines the number of columns and the dimensions of various card types.
 * @interface
 */
interface CardLayout {
  columns: number;
  chart: { cols: number; rows: number };
  widget: { cols: number; rows: number };
  table: { cols: number; rows: number };
}

/**
 * Template directive which holds a widget configuration.
 *
 * @directive
 * @usageNotes
 * This directive can be applied to a HTML element using the selector '[arpaWidgetConfig]'.
 *
 * @input arpaWidgetConfig - The widget configuration.
 * @input collection - The collection name.
 *
 * @constructor
 * Creates an instance of ArpaWidgetConfigDirective.
 *
 * @param viewRef - The reference to the ViewContainerRef.
 */
@Directive({
  selector: '[arpaWidgetConfig]',
})
export class ArpaWidgetConfigDirective {
  @Input()
  arpaWidgetConfig: string;

  @Input()
  collection: string;

  constructor(public viewRef: ViewContainerRef) {}
}

/**
 * Widget State Service provides functionality for managing the state of a widget.
 * This service is injected into each widget and is available to the projected component.
 */
export class WidgetStateService {
  public loading: Observable<boolean>;
  public events: EventEmitter<any> = new EventEmitter();

  constructor(public config: any = {}, private loadingService: LoadingService) {
    this.loading = this.loadingService.loading$;
  }

  public showLoaderUntilCompleted<T>(obs: Observable<T>): Observable<T> {
    return this.loadingService.showLoaderUntilCompleted<T>(obs);
  }
}

/**
 * Represents the DashboardComponent class.
 * This component displays the dashboard for a specific role.
 * It contains menu items, widget layout, and functionality to create and render widgets.
 * @Component
 */
@Component({
  selector: 'arpa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  routeRoleSubscription: Subscription;
  widgetRefsSubscription: Subscription;
  menuItems: Observable<MenuItem[]>;
  dashboardRole: string;
  widgetLayout: Observable<CardLayout | Record<any, any>> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small]).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 4,
          chart: { cols: 4, rows: 3 },
          widget: { cols: 4, rows: 4 },
          table: { cols: 4, rows: 8 },
        };
      }

      return {
        columns: 4,
        chart: { cols: 1, rows: 3 },
        widget: { cols: 2, rows: 4 },
        table: { cols: 4, rows: 6 },
      };
    })
  );
  @ViewChildren(ArpaWidgetConfigDirective, { read: ArpaWidgetConfigDirective }) private widgetRefs: QueryList<ArpaWidgetConfigDirective>;

  hasMusicianProfile$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService,
    private meService: MeService
  ) {}

  ngOnInit() {
    this.subscribeToDashboardRole();
    this.createMenuItems();
    this.checkIfUserHasMusicianProfile();
  }

  subscribeToDashboardRole() {
    this.routeRoleSubscription = this.route.data.subscribe((data) => {
      this.dashboardRole = data.dashboardRole.toLowerCase();
    });
  }

  createMenuItems() {
    this.menuItems = this.authService.currentUser.pipe(
      map((token) => token!.roles),
      map((roles: string[]) => roles.map((role) => ({ routerLink: [`/arpa/dashboard/${role}`], label: role.toUpperCase() })))
    );
  }

  checkIfUserHasMusicianProfile() {
    this.hasMusicianProfile$ = this.authService.currentUser.pipe(
      map((token) => token!.roles),
      filter((roles: string[]) => roles.includes('Performer')),
      switchMap(() =>
        this.meService.getProfilesMusician().pipe(
          map((profile) => {
            if (Array.isArray(profile)) {
              return profile.length === 0;
            } else {
              return !profile || profile.id == null;
            }
          })
        )
      )
    );
  }

  ngAfterViewInit() {
    // Initially render all widgets.
    this.processWidgetConfigs(this.widgetRefs.toArray());
    // Rerender on view changes.
    this.widgetRefsSubscription = this.widgetRefs.changes.subscribe((next: QueryList<ArpaWidgetConfigDirective>) => {
      this.processWidgetConfigs(next.toArray());
    });
  }

  getByType(type: string) {
    return (dashboards[this.dashboardRole] && dashboards[this.dashboardRole][type]) || [];
  }

  getActiveItem(menuItems: MenuItem[]): MenuItem {
    if (!menuItems[0]) {
      return menuItems[0];
    }
    const foundItem = menuItems.find((i) => i.label?.toLowerCase() === this.dashboardRole);
    return foundItem ?? menuItems[0];
  }

  ngOnDestroy(): void {
    this.routeRoleSubscription.unsubscribe();
    this.widgetRefsSubscription.unsubscribe();
  }

  private processWidgetConfigs(configs: ArpaWidgetConfigDirective[]) {
    configs.forEach((config) => {
      this.createWidget.apply(this, [
        config.viewRef,
        ...(Array.isArray(config.arpaWidgetConfig) ? config.arpaWidgetConfig : [config.arpaWidgetConfig]),
      ] as never);
    });
  }

  private createWidget(targetRef: ViewContainerRef, type: string, config: Record<string, any> = {}) {
    let component = widgets[type];
    if (component) {
      const injector = Injector.create({
        providers: [
          {
            provide: WidgetStateService,
            useFactory: () => {
              return new WidgetStateService(config, LoadingService.getInstance());
            },
          },
        ],
        parent: this.injector,
      });

      const componentRef = this.viewContainerRef.createComponent(component, { injector });

      const widgetRef = targetRef.createComponent(WidgetComponent, { injector, projectableNodes: [[componentRef.location.nativeElement]] });

      componentRef.changeDetectorRef.detectChanges();

      if (config.title) {
        widgetRef.instance.title = config?.title;
        this.changeDetectorRef.detectChanges();
      }
    }
  }
}
