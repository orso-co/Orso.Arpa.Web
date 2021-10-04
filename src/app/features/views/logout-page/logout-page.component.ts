import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../@arpa/services/auth.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';

@Component({
  selector: 'arpa-logout-page',
  template: '',
})
export class LogoutPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.logout().pipe(first())
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.info('auth.LOGGED_OUT');
        this.router.navigate(['/login']);
      });
  }
}
