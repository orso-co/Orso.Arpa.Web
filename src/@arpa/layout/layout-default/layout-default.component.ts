import { MenuService } from '../../components/menu/menu.service';
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

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
  @ViewChild('drawer', { static: true }) private drawer: MatSidenav;
  private routerEventSubscription: Subscription = Subscription.EMPTY;

  constructor(private breakpointObserver: BreakpointObserver, router: Router, private menuService: MenuService) {
    this.routerEventSubscription = router.events
      .pipe(
        withLatestFrom(this.isHandset),
        filter(([a, b]) => b && a instanceof NavigationEnd)
      )
      .subscribe(() => this.drawer.close());

    const storedSetting = localStorage.getItem('navExpand');
    this.isExpanded = storedSetting === 'true';

    if (this.menuService.getMenu('feature').length === 0) {
      this.menuService.add('feature', [
        {
          label: 'Dashboard',
          icon: 'pi pi home',
          translationToken: 'DASHBOARD',
          children: [
            {
              label: 'Performer',
              icon: 'pi pi-home',
              routerLink: '/arpa/dashboard/performer',
              roles: ['performer'],
              translationToken: 'PERFORMER',
            },
            { label: 'Staff', icon: 'pi pi-home', routerLink: '/arpa/dashboard/staff', roles: ['staff'], translationToken: 'STAFF' },
            { label: 'Admin', icon: 'pi pi-home', routerLink: '/arpa/dashboard/admin', roles: ['admin'], translationToken: 'ADMIN' },
          ],
        },
        {
          label: 'Allgemeines',
          translationToken: 'GENERAL',
          children: [
            {
              label: 'News',
              icon: 'pi pi-bell',
              routerLink: '/arpa/news',
              roles: ['staff'],
              translationToken: 'NEWS',
            },
            {
              label: 'Projekte',
              icon: 'pi pi-th-large',
              routerLink: '/arpa/projects',
              roles: ['staff'],
              translationToken: 'PROJECTS',
            },
            {
              label: 'Kalender',
              icon: 'pi pi-calendar',
              roles: ['staff'],
              routerLink: '/arpa/calendar',
              translationToken: 'CALENDAR',
            },
            {
              label: 'Personen',
              icon: 'pi pi-users',
              roles: ['staff'],
              routerLink: '/arpa/persons',
              translationToken: 'PERSONS',
            },
            {
              label: 'Performer',
              icon: 'pi pi-users',
              roles: ['staff'],
              routerLink: '/arpa/performer',
              translationToken: 'PERFORMER',
            },
            {
              icon: 'pi pi-clone',
              label: 'Musikerprofile',
              roles: ['staff'],
              routerLink: '/arpa/mupro',
              translationToken: 'MUPRO',
            },
            {
              icon: 'pi pi-map-marker',
              label: 'Locations',
              roles: ['staff'],
              routerLink: '/arpa/venues',
              translationToken: 'VENUES',
            },
            {
              icon: 'pi pi-info-circle',
              label: 'Auditlogs',
              roles: ['staff'],
              routerLink: '/arpa/auditlogs',
              translationToken: 'AUDITLOGS',
            },
          ],
        },

        {
          label: 'Persönliches',
          translationToken: 'PERSONAL',
          children: [
            {
              label: 'Meine Daten',
              icon: 'pi pi-user-edit',
              roles: ['performer', 'staff', 'admin'],
              routerLink: '/arpa/profile/my-data',
              translationToken: 'MY_DATA',
            },
            {
              label: 'Meine Projekte',
              icon: 'pi pi-th-large',
              roles: ['performer'],
              routerLink: '/arpa/profile/my-projects',
              translationToken: 'MY_PROJECTS',
            },
            {
              label: 'Meine Termine',
              icon: 'pi pi-calendar',
              roles: ['performer', 'staff'],
              routerLink: '/arpa/profile/my-appointments',
              translationToken: 'MY_APPOINTMENTS',
            },
            {
              label: 'Meine Profile',
              icon: 'pi pi-user-edit',
              roles: ['performer'],
              routerLink: '/arpa/profile/musicianprofile',
              translationToken: 'MY_PROFILES',
            },
            {
              label: 'Hilfe',
              icon: 'pi pi-send',
              roles: ['performer'],
              translationToken: 'SUPPORT',
              command: () => this.sendEmail(),
            },
          ],
        },
      ]);
    }
  }

  public setState() {
    this.isExpanded = !this.isExpanded;
    localStorage.setItem('navExpand', `${this.isExpanded}`);
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }
  sendEmail() {
    window.location.href = 'mailto:support@arpa.orso.co';
  }
}
