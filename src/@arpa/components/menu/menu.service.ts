import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface MenuItemArpa extends MenuItem {
  menu?: string;
  roles?: string[];
  translationToken?: string;
  children?: MenuItemArpa[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public currentUrl = new BehaviorSubject<string>('');
  private menuCollection: Record<string, Array<MenuItem>> = {};
  private menuEvents: Record<string, BehaviorSubject<Array<MenuItem>>> = {};

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      Object.keys(this.menuCollection).forEach((name) => {
        this.menuEvents[name].next(this.menuCollection[name].map((item) => this.translateLabels(item)));
      });
    });
  }

  /**
   * Returns menu by name.
   *
   * @param menu
   */
  public getMenu(menu: string): Array<MenuItem> {
    if (!this.menuCollection[menu]) {
      this.menuCollection[menu] = [];
    }
    return this.menuCollection[menu];
  }

  /**
   * Returns menu by name.
   *
   * @param menu
   */
  public getMenuEvent(menu: string): Subject<Array<MenuItem>> {
    if (!this.menuEvents[menu]) {
      this.menuEvents[menu] = new BehaviorSubject<Array<MenuItem>>(this.getMenu(menu));
    }
    return this.menuEvents[menu];
  }

  /**
   * Add entries and create menu.
   *
   * @param menu
   * @param items
   */
  public add(menu: string, items: MenuItemArpa[]) {
    if (!this.menuCollection[menu]) {
      this.menuCollection[menu] = [];
    }
    if (!this.menuEvents[menu]) {
      this.menuEvents[menu] = new BehaviorSubject<Array<MenuItem>>(this.menuCollection[menu]);
    }
    items.forEach((item) => {
      this.menuCollection[menu].push(this.translateLabels(item));
    });
    this.menuEvents[menu].next(this.menuCollection[menu]);
  }

  /**
   * Translate all labels.
   *
   * @param item
   * @private
   */
  private translateLabels(item: any): MenuItemArpa {
    Object.keys(item).forEach((key) => {
      if (key === 'label') {
        item.translationToken = item.translationToken || item[key];
        item[key] = this.translate.instant(item.translationToken);
      } else if (key === 'children') {
        item[key].forEach((child: MenuItemArpa) => {
          this.translateLabels(child);
        });
      }
    });
    return item as MenuItem;
  }
}
