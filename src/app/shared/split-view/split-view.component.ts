import {
  Component,
  ContentChild,
  HostListener,
  Input, NgZone, OnDestroy, OnInit,
  TemplateRef,
} from '@angular/core';
import { routeTransitionAnimations } from './animations';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

  @Input()
  desktopBreakPoint: number = 768;

  @ContentChild('sideViewTemplate', { static: false })
  sideViewTemplateRef: TemplateRef<any>;

  @ContentChild('contentDefaultTemplate', { static: false })
  contentDefaultTemplateRef: TemplateRef<any>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > this.desktopBreakPoint) {
      this.viewType = ViewType.Desktop;
      this.setViewState(ViewState.Show);
    } else {
      this.viewType = ViewType.Mobile;
      if(!this.activeComponent) {
        this.setViewState(ViewState.Hide);
      } else {
        this.setViewState(ViewState.Show);
      }
    }
  }

  public _animating: boolean;

  public activeComponent: any;

  public viewType: string = ViewType.Desktop;

  public viewState: string;

  get isDesktop(): boolean {
    return window.innerWidth >= this.desktopBreakPoint;
  }

  public destroyed = new Subject<any>();

  public initialCall: boolean;

  constructor(private ngZone: NgZone, private router: Router) {
    /**
     * Set initial viewState.
     */
    if (window.innerWidth < this.desktopBreakPoint) {
      this.viewType = ViewType.Mobile;
    }
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
