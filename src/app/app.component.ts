import { SubSink } from 'subsink';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import {LanguageService} from './services/language.service';

@Component({
  selector: 'arpa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(
    public translate: TranslateService,
    private primengConfig: PrimeNGConfig,
    loadingService: LoadingService,
    private router: Router,
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
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
