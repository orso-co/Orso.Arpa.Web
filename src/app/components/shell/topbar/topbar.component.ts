import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'arpa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy {
private subs = new SubSink();

  constructor(private router: Router,
              private authService: AuthService) {}

  logout(): void {
    this.subs.add(this.authService
      .logout()
      .subscribe(() => this.router.navigate(['/onboarding/login'])));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
