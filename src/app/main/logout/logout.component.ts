import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NotificationsService } from '../../core/services/notifications.service';

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
    this.authService.logout().subscribe(() => {
      this.notificationsService.info('logout.LOGGED_OUT');
      this.router.navigate(['/login']);
    });
  }
}
