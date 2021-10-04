import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../@arpa/services/auth.service';
import { RoleService } from '../../../@arpa/services/role.service';
import { map, mergeMap, take } from 'rxjs/operators';
import { RoleDto } from '../../../@arpa/models/roleDto';

@Injectable({
  providedIn: 'root',
})
export class RoleDashboardResolver implements Resolve<string> {
  constructor(
    private authService: AuthService,
    private roleService: RoleService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {

    let { role: roleName } = route.params;

    return this.authService.getMaxRoleLevelOfCurrentUser()
      .pipe(
        take(1),
        mergeMap(level => this.roleService.loadRoles()
          .pipe(take(1), map((roles: RoleDto[]) => {
            roles.forEach((role) => {
              if (!roleName && level === role.roleLevel) {
                roleName = role.roleName as string;
              }
            });
            return roleName;
          })),
        ),
        map(name => name),
      );
  }
}
