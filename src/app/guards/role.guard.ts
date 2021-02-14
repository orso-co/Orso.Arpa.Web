import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requiredRoles = route.data.roles;

    if (!requiredRoles) {
      return true;
    }

    return this.authService.isUserInAtLeastOnRole(requiredRoles).pipe(
      map((succeeded) => {
        if (succeeded) {
          return true;
        }
        this.router.navigate(['/forbidden']);
        return false;
      })
    );
  }
}
