import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@arpa/services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleDashboardResolver implements Resolve<string> {
  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    let { role: roleName } = route.params;

    return of(this.authService.getCurrentUser()).pipe(
      map((token) => {
        return roleName || token.roles[0] || 'WITHOUT';
      })
    );
  }
}
