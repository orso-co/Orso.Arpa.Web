import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { RouteTitleService } from '../@arpa/services/route-title.service';
import { ConfigService } from '../@arpa/services/config.service';
import { LoadingService } from '../@arpa/services/loading.service';
import { AuthService } from '../@arpa/services/auth.service';

@Component({
  selector: 'arpa-root',
  template: `
    <p-toast
      class='arpa-toast'
      [preventOpenDuplicates]='true'
      [showTransformOptions]="'translateY(-100%)'"
    ></p-toast>
    <section [ngClass]="{'mobile' : (isHandset | async)}">
      <router-outlet></router-outlet>
    </section>`,
})
export class AppComponent implements OnInit, OnDestroy {
  readonly defaultTitle: string;
  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  networkStatusSubscription: Subscription = Subscription.EMPTY;
  networkStatus: boolean = navigator.onLine;

  constructor(
    private configService: ConfigService,
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private routeTitleService: RouteTitleService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.defaultTitle = this.titleService.getTitle();
    this.router.events.subscribe((event) => {
      this.navigationInterceptor(event);
    });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router),
      )
      .subscribe((event) => {
          const title = this.getTitle(this.router.routerState, this.router.routerState.root);
          this.routeTitleService.setTitle(title.join(' '));
        },
      );
    this.routeTitleService.titleEvent.subscribe((title) => {
      if (title.length > 0) {
        this.titleService.setTitle(`${title} | ${this.defaultTitle}`);
      } else {
        this.titleService.setTitle(this.defaultTitle);
      }
    });
  }

  ngOnInit() {
    this.authService.populate();
    /**
     * Update Network Status.
     */
    this.networkStatusSubscription = merge(
      of(null),
      fromEvent(window, 'offline'),
      fromEvent(window, 'online'),
    ).pipe(
      map(() => navigator.onLine),
    ).subscribe(status => {
      this.networkStatus = status;
    });
    /**
     * Redirect to fatal error page if config is not ready.
     */
    if (!this.configService.isReady()) {
      this.router.navigate(['error'], {
        state: {
          error: 500,
          type: 'FatalError',
          message: 'Could not load config!',
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.networkStatusSubscription.unsubscribe();
  }

  /**
   * Global navigation handling.
   *
   * @param event
   * @private
   */
  private navigationInterceptor(event: any): void {
    if (event instanceof NavigationStart) {
      this.loadingService.loadingOn();
    } else if (event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError) {
      this.loadingService.loadingOff();
    }
  }

  /**
   * Get title from routes.
   *
   * @param state
   * @param parent
   * @private
   */
  private getTitle(state: any, parent: any): any {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    } else if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
