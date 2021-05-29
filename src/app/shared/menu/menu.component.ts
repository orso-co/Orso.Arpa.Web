import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuService } from './menu.service';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Unsubscribe } from '../../core/decorators/unsubscribe.decorator';
import { Subscription } from 'rxjs';

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

  constructor(private menuService: MenuService, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.menuSubscription = this.menuService.getMenuEvent(this.name).subscribe((v) => {
      this.menuItems = v;
    });
  }

  public toggle(event: Event) {
    this.menu.toggle(event);
  }
}
