import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RoleDto } from '../../model/roleDto';

@Injectable({
  providedIn: 'root',
})
export class RoleService implements Resolve<boolean> {
  loaded = false;
  private roles$$ = new BehaviorSubject<RoleDto[]>([]);
  roles$: Observable<RoleDto[]> = this.roles$$.asObservable();

  constructor(private apiService: ApiService) {
    const a = '';
  }

  loadRoles(): Observable<RoleDto[]> {
    return this.apiService.get<RoleDto[]>('/roles')
      .pipe(tap(roles => this.roles$$.next(roles)), tap(roles => this.loaded = true));
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (this.loaded) {
      return of(this.loaded);
    }

    return this.loadRoles().pipe(map(() => this.loaded));
  }
}
