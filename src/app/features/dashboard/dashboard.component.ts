import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
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
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@arpa/services';
import { MenuItem } from 'primeng/api';
import { WidgetComponent } from './widget/widget.component';
import { LoadingService } from '@arpa/services';
import { dashboards, widgets } from './dashboard.config';
import { MeService } from '@arpa/services';
import { MyMusicianProfileDto } from '@arpa/models';

interface CardLayout {
  columns: number;
  chart: { cols: number; rows: number };
  widget: { cols: number; rows: number };
  table: { cols: number; rows: number };
}

/**
 * Template directive which holds a widget configuration.
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
 * An instance gets injected into each widget and is available to the projected component.
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

  hasMusicianProfile: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    private cfr: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef,
    private injector: Injector,
    private vcRef: ViewContainerRef,
    private authService: AuthService,
    private meService: MeService
  ) {}

  ngOnInit() {
    this.routeRoleSubscription = this.route.data.subscribe((data) => {
      this.dashboardRole = data.dashboardRole.toLowerCase();
    });

    this.menuItems = this.authService.currentUser.pipe(
      map((token) => token!.roles),
      map((roles) => roles.map((role) => ({ routerLink: [`/arpa/dashboard/${role}`], label: role.toUpperCase() })))
    );

    this.meService.getProfilesMusician().subscribe((profile: MyMusicianProfileDto | MyMusicianProfileDto[]) => {
      let musicianProfile: MyMusicianProfileDto | null;

      if (Array.isArray(profile)) {
        musicianProfile = profile.length > 0 ? profile[0] : null;
      } else {
        musicianProfile = profile;
      }

      this.hasMusicianProfile = musicianProfile !== null && musicianProfile.id != null;
    });
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
      let widgetComponentFactory = this.cfr.resolveComponentFactory(WidgetComponent);

      const ngContentFactory = this.cfr.resolveComponentFactory(component);

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

      const componentRef = this.vcRef.createComponent<any>(ngContentFactory, undefined, injector);

      const widgetRef = targetRef.createComponent(widgetComponentFactory, undefined, injector, [[componentRef.location.nativeElement]]);

      componentRef.changeDetectorRef.detectChanges();

      if (config.title) {
        widgetRef.instance.title = config?.title;
        this.cdRef.detectChanges();
      }
    }
  }
}
