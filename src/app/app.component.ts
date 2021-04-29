import { Component, OnInit } from '@angular/core';
import { ConfigService } from './core/services/config.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { AuthService } from './core/services/auth.service';

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
  title = 'Orso-Arpa-Web';

  constructor(
    private configService: ConfigService,
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService,
  ) {
    this.router.events.subscribe((event) => {
      this.navigationInterceptor(event);
    });
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

  navigationInterceptor(event: any): void {
    if (event instanceof NavigationStart) {
      this.loadingService.loadingOn();
    }
    if (event instanceof NavigationEnd) {
      this.loadingService.loadingOff();
    }
    if (event instanceof NavigationCancel) {
      this.loadingService.loadingOff();
    }
    if (event instanceof NavigationError) {
      this.loadingService.loadingOff();
    }
  }
}
