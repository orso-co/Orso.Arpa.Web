import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivateChild {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRoles = route.data.roles;

    if (!requiredRoles) {
      return true;
    }

    return this.authService.isUserInAtLeastOnRole(requiredRoles).pipe(
      map((succeeded) => {
        if (succeeded) {
          return true;
        }
        return this.router.parseUrl('/forbidden');
      }),
    );
  }

}
