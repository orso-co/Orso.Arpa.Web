import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'arpa-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
})
export class LayoutDefaultComponent {
  @ViewChildren('navToolBar')
  navToolBar: QueryList<ElementRef>;

  isExpanded: boolean;
  showSubmenu: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  constructor(private breakpointObserver: BreakpointObserver, private renderer: Renderer2) {
    const storedSetting = localStorage.getItem('navExpand');
    this.isExpanded = storedSetting === 'true';
  }

  public setState() {
    this.isExpanded = !this.isExpanded;
    localStorage.setItem('navExpand', `${this.isExpanded}`);
  }

}
