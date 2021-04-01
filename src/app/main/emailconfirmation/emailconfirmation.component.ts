import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IConfirmEmailDto } from '../../models/IConfirmEmailDto';
import { AuthService } from '../../core/services/auth.service';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
  selector: 'arpa-emailconfirmation',
  templateUrl: './emailconfirmation.component.html',
  styleUrls: ['./emailconfirmation.component.scss'],
})
export class EmailconfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log(
      this.route.queryParams,
    );
    this.route.queryParams
      .subscribe(params => {
        const confirmEmail: IConfirmEmailDto = { token: params.token, email: params.email };
        this.authService
          .confirmMail(confirmEmail)
          .subscribe(() => {
            this.notificationsService.success('emailconfirmation.SUCCESS');
          });
      });
    this.router.navigate(['/']);
  }

}
