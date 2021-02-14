import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.scss']
})
export class PerformerComponent implements OnInit, OnDestroy {
private subs = new SubSink();

  constructor(private router: Router,
              private authService: AuthService) {
              }

  ngOnInit(): void {

  }

  logout(): void {
    this.subs.add(this.authService
      .logout()
      .subscribe(() => this.router.navigate(['/onboarding/login'])));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
