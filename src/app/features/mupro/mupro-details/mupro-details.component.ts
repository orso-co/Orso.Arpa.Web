import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../@arpa/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'arpa-mupro-details',
  templateUrl: './mupro-details.component.html',
  styleUrls: ['./mupro-details.component.scss'],
})
export class MuproDetailsComponent {

  menuItems: Array<MenuItem>;

  constructor(authService: AuthService, private router: Router, private route: ActivatedRoute) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.menuItems = [
      { label: 'Projects', target: '.' },
      { label: 'Details', target: '.' },
    ];
  }

  getActiveItem(menuItems: MenuItem[]): MenuItem {
    const child = this.route.children && this.route.children[0];
    if (!child) {
      return menuItems[0];
    }
    const foundItem = menuItems.find((i) => i.label?.toLowerCase() === child.snapshot.url[0].path);
    return foundItem ?? menuItems[0];
  }

}
