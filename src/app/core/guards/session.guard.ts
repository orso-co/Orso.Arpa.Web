import { Injectable } from '@angular/core';
import {
  UrlTree,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isAuthenticated.pipe(map((isAuthenticated) => {
      if (isAuthenticated && childRoute.data.sessionPrevent) {
        this.router.navigate(['/arpa']);
      }
      return true;
    }));
  }

}
