import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../@arpa/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'arpa-mupro-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {

  tabMenuItems: Array<MenuItem>;

  constructor(authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.tabMenuItems = [
      { label: 'PROJECTS', target: '.' },
      { label: 'APPOINTMENTS', target: '.' },
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
