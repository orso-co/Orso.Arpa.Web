import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@arpa/services';

@Injectable({
  providedIn: 'root',
})
export class DashboardRoleGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let { role: roleName } = route.params;

    return this.authService.isUserInAtLeastOnRole([roleName]).pipe(
      map((succeeded) => {
        if (!roleName || succeeded) {
          return true;
        }
        return this.router.parseUrl('/forbidden');
      })
    );
  }
}
