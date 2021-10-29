import { Injectable } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface MenuItemArpa extends MenuItem {
  menu?: string;
  roles?: string[];
  translationToken?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  public currentUrl = new BehaviorSubject<string>('');
  private langChangeListener;
  private menuCollection: Record<string, Array<MenuItem>> = {};
  private menuEvents: Record<string, BehaviorSubject<Array<MenuItem>>> = {};

  constructor(private router: Router, private translate: TranslateService) {
    this.addRouteConfig(this.router.config, '/');

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(e => e as NavigationEnd),
      ).subscribe((event: NavigationEnd) => {
      this.currentUrl.next(event.urlAfterRedirects);
    });

    this.langChangeListener = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
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
   * Parse route config and create menu entries.
   *
   * @param config
   * @param basePath
   */
  public addRouteConfig(config: Route[], basePath: string) {
    // ToDo: respect roles config data
    Object.values<Route>(config).forEach((root) => {
      if (root.data?.menu) {
        const { roles, menu: { name, label, icon } } = root.data;
        this.add(name, [{ label, icon, routerLink: `${basePath}${root.path}`, roles }]);
      }
      root.children?.forEach((route) => {
        if (route.data?.menu) {
          const { roles, menu: { name, label, icon } } = route.data;
          this.add(name, [{ label, icon, routerLink: `${basePath}${root.path}/${route.path}`, roles }]);
        }
      });
    });
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
      } else if (key === 'items') {
        item[key] = this.translateLabels(item[key]);
      }
    });
    return item as MenuItem;
  }
}
