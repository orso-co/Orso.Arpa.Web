import { Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'arpa-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
})
export class LayoutDefaultComponent implements OnDestroy {
  @ViewChildren('navToolBar')
  navToolBar: QueryList<ElementRef>;

  isExpanded: boolean;
  showSubmenu: boolean = false;

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );
  @ViewChild('drawer', { static: true }) private drawer: MatSidenav;
  private routerEventSubscription: Subscription = Subscription.EMPTY;

  constructor(private breakpointObserver: BreakpointObserver, router: Router) {
    this.routerEventSubscription = router.events.pipe(
      withLatestFrom(this.isHandset),
      filter(([a, b]) => b && a instanceof NavigationEnd),
    ).subscribe(() => this.drawer.close());

    const storedSetting = localStorage.getItem('navExpand');
    this.isExpanded = storedSetting === 'true';
  }

  public setState() {
    this.isExpanded = !this.isExpanded;
    localStorage.setItem('navExpand', `${this.isExpanded}`);
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }

}
