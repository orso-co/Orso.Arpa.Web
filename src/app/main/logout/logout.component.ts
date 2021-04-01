import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { LoadingService } from '../../core/services/loading.service';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../../core/services/logger.service';
import { of } from 'rxjs';

@Component({
  selector: 'arpa-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private router: Router,
    private loadingService: LoadingService,
    private logger: LoggerService,
  ) {
  }

  ngOnInit(): void {
    this.subs.add(
      this.loadingService.showLoaderUntilCompleted(this.authService.logout()).pipe(
        catchError((error) => {
          this.logger.error(error);
          this.authService.purgeAuth();
          return of({});
        }),
      ).subscribe(() => {
        this.notificationsService.info('logout.LOGGED_OUT');
        this.router.navigate(['/login']);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
