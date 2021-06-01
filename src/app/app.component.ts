import { Component, OnInit } from '@angular/core';
import { ConfigService } from './core/services/config.service';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { AuthService } from './core/services/auth.service';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { RouteTitleService } from './core/services/route-title.service';

@Component({
  selector: 'arpa-root',
  template: `
    <p-toast
      class='arpa-toast'
      [preventOpenDuplicates]='true'
      [showTransformOptions]="'translateY(-100%)'"
    ></p-toast>
    <arpa-loading></arpa-loading>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  readonly defaultTitle: string;

  constructor(
    private configService: ConfigService,
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private routeTitleService: RouteTitleService,
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
      if(title.length > 0) {
        this.titleService.setTitle(`${title} | ${this.defaultTitle}`);
      } else {
        this.titleService.setTitle(this.defaultTitle);
      }
    });
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

  ngOnInit() {
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

    this.authService.populate();
  }
}
