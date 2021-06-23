import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'arpa-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {

  public error = 0;
  public type = '';
  public message = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    // Assign dynamic data
    if (navigation?.extras.state) {
      Object.assign(this, navigation.extras.state);
    } else {
      // Assign static data by default.
      Object.assign(this, this.activatedRoute.snapshot.data);
    }
  }
}
