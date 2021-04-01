import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService, IToken} from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.currentUser.pipe(
      map((token: IToken | null) => {
        if (token === null || route.children.length > 0) {
          return true;
        }

        switch (token.roles.length) {
          case 0:
            return this.router.parseUrl('/arpa/dashboard/noRole');
          default:
            return this.router.parseUrl(`/arpa/dashboard/${token.roles[0]}`);
        }
      })
    );
  }
}
