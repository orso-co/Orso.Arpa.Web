import { LoadingService } from './../../../services/loading.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ToastService } from './../../../services/toast.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'arpa-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.loadingService.showLoaderUntilCompleted(this.authService.logout()).subscribe(() => {
        this.toastService.info('logout.LOGGED_OUT');
        this.router.navigate(['/onboarding/login']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
