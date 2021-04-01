import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {RoleService} from '../core/services/role.service';

@Injectable({ providedIn: 'root' })
export class RoleListResolver implements Resolve<boolean> {
  constructor(private roleService: RoleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (this.roleService.loaded) {
      return of(true);
    }

    return this.roleService.loadRoles().pipe(map(() => this.roleService.loaded));
  }
}
