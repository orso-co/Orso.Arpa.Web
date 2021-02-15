import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-dashboard-selector',
  templateUrl: './dashboard-selector.component.html',
  styleUrls: ['./dashboard-selector.component.scss']
})
export class DashboardSelectorComponent  {
public userRoles$: Observable<string[]>;

  constructor(authService: AuthService) {
    this.userRoles$ = authService.token$.pipe(map(token => token?.roles!));
  }
}
