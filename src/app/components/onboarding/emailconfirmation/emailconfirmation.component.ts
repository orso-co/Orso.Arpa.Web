import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IConfirmEmailDto } from '../../../models/IConfirmEmailDto';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'arpa-emailconfirmation',
  templateUrl: './emailconfirmation.component.html',
  styleUrls: ['./emailconfirmation.component.scss']
})
export class EmailconfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      const confirmEmail: IConfirmEmailDto = {token: params.token, email: params.email};
      this.authService
      .confirmMail(confirmEmail)
      .subscribe(() => {
        this.toastService.success('emailconfirmation.SUCCESS');
      });
    });
    this.router.navigate(['/']);
  }

}
