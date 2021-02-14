import { AuthService, IToken } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.token$.pipe(
      map((token: IToken | null) => {
        if (!token) {
          this.router.navigate(['/onboarding/login']);
          return false;
        }

        switch (token.roles.length) {
          case 0:
            throw new Error('Es muss definiert werden, wohin bei Usern navigiert werden soll, die keine Rolle haben');
          case 1:
            this.router.navigate([`/pages/dashboard/${token.roles[0]}`]);
            return false;
          default:
            return true;
        }
      })
    );
  }
}
