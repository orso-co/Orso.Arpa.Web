import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { ApiService } from '../../../@arpa/services/api.service';
import { SectionTreeDto } from '../../../@arpa/models/sectionTreeDto';
import { SectionDto } from '../../../@arpa/models/sectionDto';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  sectionsLoaded = false;
  private baseUrl: string;
  private sectionTrees = new Map<number | undefined, SectionTreeDto>();
  private sections$$ = new BehaviorSubject<SectionDto[]>([]);
  sections$: Observable<SectionDto[]> = this.sections$$.asObservable();

  constructor(private apiService: ApiService) {
    this.baseUrl = '/sections';
  }

  load(): Observable<SectionDto[]> {
    return this.apiService.get<SectionDto[]>(this.baseUrl).pipe(
      shareReplay(),
      tap((sections) => (this.sections$$.next(sections))),
      tap(sections => this.sectionsLoaded = true),
    );
  }

  loadTree(treeMaxLevel?: number): Observable<SectionTreeDto> {
    let params: HttpParams = new HttpParams();
    if (treeMaxLevel) {
      params = params.set('maxLevel', treeMaxLevel!.toString());
    }
    return this.apiService
      .get<SectionTreeDto>(`${this.baseUrl}/tree`, params)
      .pipe(
        shareReplay(),
        tap((tree) => this.sectionTrees.set(treeMaxLevel, tree)),
      );
  }

  treeLoaded(treeMaxLevel?: number): boolean {
    return this.sectionTrees.has(treeMaxLevel);
  }

  getTree(treeMaxLevel?: number): SectionTreeDto | undefined {
    return this.sectionTrees.get(treeMaxLevel);
  }

  getPositionsByInstrument(id: string): Observable<SectionDto[]> {
    return this.apiService.get<SectionDto[]>(`${this.baseUrl}/${id}/positions`);
  }
}
