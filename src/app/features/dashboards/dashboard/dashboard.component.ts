import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'arpa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  menuItems$: Observable<MenuItem[]>;

  constructor(authService: AuthService, router: Router, private route: ActivatedRoute) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.menuItems$ = authService.currentUser.pipe(
      map((token) => token!.roles),
      map((roles) => roles.map((role) => ({ routerLink: [`/arpa/dashboard/${role}`], label: role.toUpperCase() }))),
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
