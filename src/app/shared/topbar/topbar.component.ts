import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService, IToken } from '../../core/services/auth.service';
import { Unsubscribe } from '../../core/decorators/unsubscribe.decorator';
import { TopbarService } from './topbar.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'arpa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
@Unsubscribe()
export class TopbarComponent implements OnInit{

  token$: Observable<IToken | null>;
  langChangeListener: Subscription;
  titleSubscription: Subscription;
  routerSubscription: Subscription;
  pageTitle: string;
  sideBarDisplay: boolean;

  constructor(private router: Router, private topBarService: TopbarService, private authService: AuthService) {
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

  ngOnInit(): void {

  }
}
