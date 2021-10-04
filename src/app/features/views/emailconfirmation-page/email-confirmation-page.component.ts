import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../@arpa/services/auth.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { ConfirmEmailDto } from '../../../../@arpa/models/confirmEmailDto';

@Component({
  selector: 'arpa-emailconfirmation-page',
  template: '',
})
export class EmailConfirmationPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(first())
      .subscribe(params => {
        const confirmEmail: ConfirmEmailDto = { token: params.token, email: params.email };
        this.authService
          .confirmMail(confirmEmail)
          .pipe(first())
          .subscribe(() => {
            this.notificationsService.success('EMAIL_CONFIRM_SUCCESS', 'views');
          });
      });
    this.router.navigate(['/']);
  }

}
