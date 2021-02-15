import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'arpa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  menuItems$: Observable<MenuItem[]>;

  constructor(authService: AuthService, router: Router, private route: ActivatedRoute) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.menuItems$ = authService.token$.pipe(
      map((token) => token!.roles),
      map((roles) => roles.map((role) => ({ routerLink: [`/pages/dashboard/${role}`], label: role.toUpperCase() })))
    );
  }

  getActiveItem(menuItems: MenuItem[]): MenuItem {
    const child = this.route.children[0];
    if (!child) {
      return menuItems[0];
    }
    const foundItem = menuItems.find((i) => i.label?.toLowerCase() === child.snapshot.url[0].path);
    return foundItem ?? menuItems[0];
  }
}
