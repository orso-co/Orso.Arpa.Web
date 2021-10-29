import { Component, ContentChild, OnDestroy, TemplateRef } from '@angular/core';
import { routeTransitionAnimations } from './animations';
import { ActivatedRoute, Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

enum ViewType {
  Mobile = 'mobile',
  Desktop = 'desktop',
}

enum ViewState {
  Hide = 'Hide',
  Show = 'Show',
}

@Component({
  selector: 'arpa-split-view',
  templateUrl: './split-view.component.html',
  styleUrls: ['./split-view.component.scss'],
  animations: [routeTransitionAnimations],
})
export class SplitViewComponent implements OnDestroy {

  @ContentChild('sideViewTemplate', { static: false })
  sideViewTemplateRef: TemplateRef<any>;

  @ContentChild('contentDefaultTemplate', { static: false })
  contentDefaultTemplateRef: TemplateRef<any>;
  public _animating: boolean;
  public activeComponent: any;
  public viewType: string = ViewType.Desktop;
  public viewState: string;
  public destroyed = new Subject<any>();

  isTablet: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
    .pipe(
      map(result => {
        if (result.matches) {
          this.viewType = ViewType.Mobile;
          if (!this.activeComponent) {
            this.setViewState(ViewState.Hide);
          } else {
            this.setViewState(ViewState.Show);
          }
        } else {
          this.viewType = ViewType.Desktop;
          this.setViewState(ViewState.Show);
        }
        return result.matches;
      }),
      shareReplay(),
    );

  isLarge: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(result => result.matches), shareReplay());
  isRedirect: boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private breakpointObserver: BreakpointObserver) {
    this.setViewState(ViewState.Hide);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  setViewState(state: ViewState = ViewState.Hide) {
    const navigation = this.router.getCurrentNavigation()?.extras;
    if (!navigation?.state || navigation?.state && !navigation?.state.back) {
      this.viewState = `${this.viewType}${state}`;
    } else {
      this.viewState = `${this.viewType}${ViewState.Hide}`;
    }
  }

  hideContentView(): void {
    this.router.navigate(['.'], { state: { back: true }, relativeTo: this.activeRoute.parent }).then(() => {
      this.setViewState(ViewState.Hide);
    });
  }

  onRouteActivation(event: any) {
    this.setViewState(ViewState.Show);
    this.activeComponent = event;
  }

  onRouteDeactivation() {
    this.setViewState(ViewState.Hide);
    this.activeComponent = null;
  }

  trigger(viewState: any) {
    if (this.viewType === ViewType.Desktop) {
      return `${this.viewType}${ViewState.Show}`;
    }
    if (!this.activeComponent && !this._animating) {
      return `${this.viewType}${ViewState.Hide}`;
    }
    return viewState;
  }

  animating(state: boolean) {
    this._animating = state;
  }
}
