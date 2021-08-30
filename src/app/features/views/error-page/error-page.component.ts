import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'arpa-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {

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

  // page rendered is not getting translation
  // - router -> module (lazy) <- main layout <- 
}
