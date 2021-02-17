import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { IRoleDto } from '../models/IRoleDto';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../models/api-url';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  loaded = false;
  private roles$$ = new BehaviorSubject<IRoleDto[]>([]);
  roles$: Observable<IRoleDto[]> = this.roles$$.asObservable();
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/roles`;
  }

  loadRoles(): Observable<IRoleDto[]> {
    return this.http.get<IRoleDto[]>(this.baseUrl).pipe(tap(roles => this.roles$$.next(roles)), tap(roles => this.loaded = true));
  }
}
