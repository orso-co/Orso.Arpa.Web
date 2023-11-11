import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItemArpa, MenuService } from './menu.service';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { intersection } from 'lodash-es';
import { AuthService } from '@arpa/services';
import { Unsubscribe } from '../../decorators/unsubscribe.decorator';

export interface MenuItemTplContext {
  $implicit: () => void;
}

@Component({
  selector: 'arpa-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
@Unsubscribe()
export class MenuComponent implements OnInit {
  @Input()
  name: string;

  @Input()
  menuClass: string;

  @Input()
  popup: boolean;

  @Input()
  appendTo: any;

  @ViewChild(Menu)
  menu: Menu;

  menuSubscription: Subscription;
  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((token) => {
      this.menuSubscription = this.menuService
        .getMenuEvent(this.name)
        .pipe(
          map((items: MenuItemArpa[]) =>
            items.filter((item: MenuItemArpa) => (item.roles ? intersection(token.roles, item.roles).length > 0 : true))
          ),
          map((filteredItems: MenuItemArpa[]) =>
            filteredItems.map((fi) => ({
              ...fi,
              children: fi.children
                ? fi.children.filter((item: MenuItemArpa) => (item.roles ? intersection(token.roles, item.roles).length > 0 : true))
                : undefined,
            }))
          )
        )
        .subscribe((v: MenuItemArpa[]) => {
          this.menuItems = v.map((p) => ({ ...p, items: p.children ?? undefined }));
        });
    });
  }

  public toggle(event: Event) {
    this.menu.toggle(event);
  }
}
