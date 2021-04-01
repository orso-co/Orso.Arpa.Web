import { Observable, BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, shareReplay } from 'rxjs/operators';
import { ISectionDto, ISectionTreeDto } from '../../models/section';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private baseUrl: string;
  private sectionTrees = new Map<number | undefined, ISectionTreeDto>();
  private sections$$ = new BehaviorSubject<ISectionDto[]>([]);
  sections$: Observable<ISectionDto[]> = this.sections$$.asObservable();
  sectionsLoaded = false;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/sections';
  }

  load(): Observable<ISectionDto[]> {
    return this.apiService.get<ISectionDto[]>(this.baseUrl).pipe(
      shareReplay(),
      tap((sections) => (this.sections$$.next(sections))),
      tap(sections => this.sectionsLoaded = true),
    );
  }

  loadTree(treeMaxLevel?: number): Observable<ISectionTreeDto> {
    let params: HttpParams = new HttpParams();
    if (treeMaxLevel) {
      params = params.set('maxLevel', treeMaxLevel!.toString());
    }
    return this.apiService
      .get<ISectionTreeDto>(`${this.baseUrl}/tree`, params)
      .pipe(
        shareReplay(),
        tap((tree) => this.sectionTrees.set(treeMaxLevel, tree)),
      );
  }

  treeLoaded(treeMaxLevel?: number): boolean {
    return this.sectionTrees.has(treeMaxLevel);
  }

  getTree(treeMaxLevel?: number): ISectionTreeDto | undefined {
    return this.sectionTrees.get(treeMaxLevel);
  }
}
