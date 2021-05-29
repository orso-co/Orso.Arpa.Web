import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { IRoleDto } from '../../models/IRoleDto';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleService implements Resolve<boolean> {
  loaded = false;
  private roles$$ = new BehaviorSubject<IRoleDto[]>([]);
  roles$: Observable<IRoleDto[]> = this.roles$$.asObservable();

  constructor(private apiService: ApiService) {
    const a = '';
  }

  loadRoles(): Observable<IRoleDto[]> {
    return this.apiService.get<IRoleDto[]>('/roles')
      .pipe(tap(roles => this.roles$$.next(roles)), tap(roles => this.loaded = true));
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (this.loaded) {
      return of(this.loaded);
    }

    return this.loadRoles().pipe(map(() => this.loaded));
  }
}
