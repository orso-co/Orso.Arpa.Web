import { Observable, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { TopbarService } from './topbar.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService, IToken } from '../../services/auth.service';
import { Unsubscribe } from '../../decorators/unsubscribe.decorator';

@Component({
  selector: 'arpa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
@Unsubscribe()
export class TopbarComponent {

  token$: Observable<IToken | null>;
  langChangeListener: Subscription;
  titleSubscription: Subscription;
  routerSubscription: Subscription;
  pageTitle: string;
  sideBarDisplay: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private topBarService: TopbarService, private authService: AuthService) {
    this.token$ = this.authService.currentUser;
    this.pageTitle = 'performerWELCOME';
    this.titleSubscription = topBarService.title.subscribe((title) => {
      this.pageTitle = title;
    });
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.sideBarDisplay = false;
    });
  }

  getRoleNames(token: IToken): string {
    return token.roles.map((role) => role.charAt(0).toUpperCase() + role.slice(1)).join(', ');
  }
}
