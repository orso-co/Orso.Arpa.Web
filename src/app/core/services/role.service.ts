import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IRoleDto } from '../../models/IRoleDto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  loaded = false;
  private roles$$ = new BehaviorSubject<IRoleDto[]>([]);
  roles$: Observable<IRoleDto[]> = this.roles$$.asObservable();

  constructor(private apiService: ApiService) {
  }

  loadRoles(): Observable<IRoleDto[]> {
    return this.apiService.get<IRoleDto[]>('/roles')
      .pipe(tap(roles => this.roles$$.next(roles)), tap(roles => this.loaded = true));
  }
}
