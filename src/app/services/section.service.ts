import { ISectionTreeDto } from './../models/section';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../models/api-url';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private baseUrl: string;
  private sectionTrees = new Map<number | undefined, ISectionTreeDto>();

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/sections`;
  }

  loadTree(treeMaxLevel?: number): Observable<ISectionTreeDto> {
    let params: HttpParams = new HttpParams();
    if (treeMaxLevel) {
      params = params.set('maxLevel', treeMaxLevel!.toString());
    }
    return this.http
      .get<ISectionTreeDto>(`${this.baseUrl}/tree`, { params })
      .pipe(tap((tree) => this.sectionTrees.set(treeMaxLevel, tree)));
  }

  treeLoaded(treeMaxLevel?: number): boolean {
    return this.sectionTrees.has(treeMaxLevel);
  }

  getTree(treeMaxLevel?: number): ISectionTreeDto | undefined {
    return this.sectionTrees.get(treeMaxLevel);
  }
}
