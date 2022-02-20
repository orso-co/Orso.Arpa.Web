import { MenuService } from './../../components/menu/menu.service';
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
          children: [
            {
              label: 'Performer',
              icon: 'pi pi-home',
              routerLink: '/arpa/dashboard/performer',
              roles: ['performer'],
              translationToken: 'DASHBOARD',
            },
            { label: 'Staff', icon: 'pi pi-home', routerLink: '/arpa/dashboard/staff', roles: ['staff'], translationToken: 'DASHBOARD' },
            { label: 'Admin', icon: 'pi pi-home', routerLink: '/arpa/dashboard/admin', roles: ['admin'], translationToken: 'DASHBOARD' },
          ],
        },
        {
          label: 'Allgemeines',
          translationToken: 'GENERAL',
          children: [
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
              label: 'Kontakte',
              icon: 'pi pi-users',
              roles: ['staff'],
              routerLink: '/arpa/contacts',
              translationToken: 'CONTACTS',
            },
            {
              icon: 'pi pi-clone',
              label: 'Musikerprofile',
              roles: ['staff'],
              routerLink: '/arpa/mupro',
              translationToken: 'MUPRO',
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
              icon: 'pi pi-user',
              routerLink: '/arpa/profile/user',
              roles: ['performer', 'staff', 'admin'],
              translationToken: 'MY_DATA',
            },
            {
              label: 'Meine Projekte',
              icon: 'pi pi-th-large',
              routerLink: '/arpa/profile/my-projects',
              roles: ['performer'],
              translationToken: 'MY_PROJECTS',
            },
            {
              label: 'Meine Termine',
              icon: 'pi pi-check-square',
              roles: ['performer', 'staff'],
              routerLink: '/arpa/profile/appointments',
              translationToken: 'MY_APPOINTMENTS',
            },
            {
              label: 'Meine Profile',
              icon: 'pi pi-user-edit',
              roles: ['performer'],
              routerLink: '/arpa/profile/musician',
              translationToken: 'MY_PROFILES',
            },
            {
              label: 'Mein QR-Code',
              icon: 'pi pi-sign-in',
              roles: ['performer'],
              routerLink: '/arpa/profile/qrcode',
              translationToken: 'MY_QRCODE',
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
}
