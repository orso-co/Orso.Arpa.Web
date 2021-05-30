import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItemArpa, MenuService } from './menu.service';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Unsubscribe } from '../../core/decorators/unsubscribe.decorator';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { intersection } from 'lodash-es';

export interface MenuItemTplContext {
  $implicit: () => void;
}

@Unsubscribe()
@Component({
  selector: 'arpa-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  menuClass: string;

  @Input()
  popup: boolean;

  @ViewChild(Menu)
  menu: Menu;

  menuSubscription: Subscription;
  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService, private el: ElementRef, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((token) => {
      this.menuSubscription = this.menuService.getMenuEvent(this.name)
        .pipe(map((items: MenuItemArpa[]) => items
          .filter((item: MenuItemArpa) => item.roles ? intersection(token.roles, item.roles).length > 0 : true)))
        .subscribe((v: any) => {
          this.menuItems = v;
        });
    });
  }

  public toggle(event: Event) {
    this.menu.toggle(event);
  }
}
