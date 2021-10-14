import { Component, ContentChild, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { routeTransitionAnimations } from './animations';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map, pairwise, shareReplay, startWith, takeUntil } from 'rxjs/operators';
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
export class SplitViewComponent implements OnDestroy, OnInit {

  @ContentChild('sideViewTemplate', { static: false })
  sideViewTemplateRef: TemplateRef<any>;

  @ContentChild('contentDefaultTemplate', { static: false })
  contentDefaultTemplateRef: TemplateRef<any>;
  public _animating: boolean;
  public activeComponent: any;
  public viewType: string = ViewType.Desktop;
  public viewState: string;
  public destroyed = new Subject<any>();
  public initialCall: boolean;

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

  constructor(private router: Router, private activeRoute: ActivatedRoute, private breakpointObserver: BreakpointObserver) {
    this.initialCall = true;
    this.setViewState(ViewState.Hide);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      pairwise(),
      filter((events: RouterEvent[]) => events[0].url === events[1].url),
      startWith('initial'),
      takeUntil(this.destroyed),
    ).subscribe((result) => {
      if (result !== 'initial') {
        this.initialCall = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  setViewState(state: ViewState = ViewState.Hide) {
    this.viewState = `${this.viewType}${state}`;
  }

  hideContentView(): void {
    // ToDo: prevent if dirty!
    // this.router.navigate(['.'], { relativeTo: this.activeRoute.parent });
    this.setViewState(ViewState.Hide);
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
    if (this.initialCall && !this.activeComponent && !this._animating) {
      this.setViewState(ViewState.Hide);
    } else if (!this.activeComponent && !this._animating) {
      return `${this.viewType}${ViewState.Hide}`;
    }
    return viewState;
  }

  animating(state: boolean) {
    this._animating = state;
  }
}
