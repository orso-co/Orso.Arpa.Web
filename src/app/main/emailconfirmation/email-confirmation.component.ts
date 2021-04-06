import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IConfirmEmailDto } from '../../models/IConfirmEmailDto';
import { AuthService } from '../../core/services/auth.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'arpa-emailconfirmation',
  template: '',
})
export class EmailConfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(first())
      .subscribe(params => {
        const confirmEmail: IConfirmEmailDto = { token: params.token, email: params.email };
        this.authService
          .confirmMail(confirmEmail)
          .pipe(first())
          .subscribe(() => {
            this.notificationsService.success('emailconfirmation.SUCCESS');
          });
      });
    this.router.navigate(['/']);
  }

}
