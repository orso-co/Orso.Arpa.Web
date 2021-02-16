import { SubSink } from 'subsink';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'arpa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Arpa 2.0';
  private subs = new SubSink();

  constructor(
    public translate: TranslateService,
    private primengConfig: PrimeNGConfig,
    loadingService: LoadingService,
    private router: Router
  ) {
    this.subs.add(this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          loadingService.loadingOn();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          loadingService.loadingOff();
          break;
        }
        default: {
          break;
        }
      }}));

    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de'); // used as a fallback when a translation isn't found

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'de');
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
