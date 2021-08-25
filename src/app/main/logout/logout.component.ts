import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'arpa-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

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
