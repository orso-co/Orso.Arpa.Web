import { ToastService } from './../services/toast.service';
import { AuthService, IToken } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.token$.pipe(
      map((token: IToken | null) => {
        if (!token) {
          this.toastService.info('login.LOGIN_FIRST');
          return this.router.parseUrl('/onboarding/login');
        }

        if (route.children.length > 0) {
          return true;
        }

        switch (token.roles.length) {
          case 0:
            return this.router.parseUrl('/pages/dashboard/noRole');
          default:
            return this.router.parseUrl(`/pages/dashboard/${token.roles[0]}`);
        }
      })
    );
  }
}
