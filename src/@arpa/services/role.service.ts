import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RoleDto } from '../models/roleDto';

@Injectable({
  providedIn: 'root',
})
export class RoleService implements Resolve<boolean> {
  loaded = false;
  private roles$$ = new BehaviorSubject<RoleDto[]>([]);
  roles$: Observable<RoleDto[]> = this.roles$$.asObservable();

  constructor(private apiService: ApiService) {
  }

  loadRoles(): Observable<RoleDto[]> {
    if (this.loaded) {
      return this.roles$$;
    }
    return this.apiService.get<RoleDto[]>('/roles')
      .pipe(tap(roles => this.roles$$.next(roles)), tap(roles => this.loaded = true));
  }

  getRoles() {
    return this.roles$$;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.loadRoles().pipe(map(() => this.loaded));
  }
}
