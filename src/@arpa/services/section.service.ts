import { SelectValueDto, SectionTreeDto, SectionDto } from '@arpa/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ApiService } from '@arpa/services';
import { SelectItem } from 'primeng/api';

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
      tap((sections) => this.sections$$.next(sections)),
      tap((sections) => (this.sectionsLoaded = true))
    );
  }

  loadTree(treeMaxLevel?: number): Observable<SectionTreeDto> {
    let params: HttpParams = new HttpParams();
    if (treeMaxLevel) {
      params = params.set('maxLevel', treeMaxLevel!.toString());
    }
    return this.apiService.get<SectionTreeDto>(`${this.baseUrl}/tree`, params).pipe(
      shareReplay(),
      tap((tree) => this.sectionTrees.set(treeMaxLevel, tree))
    );
  }

  treeLoaded(treeMaxLevel?: number): boolean {
    return this.sectionTrees.has(treeMaxLevel);
  }

  getTree(treeMaxLevel?: number): SectionTreeDto | undefined {
    return this.sectionTrees.get(treeMaxLevel);
  }

  getPositionsByInstrument(id: string): Observable<SelectItem[]> {
    return this.apiService.get<SelectValueDto[]>(`${this.baseUrl}/${id}/positions`).pipe(
      shareReplay(),
      map((dtos) => dtos.map((v) => this.mapSelectValueToSelectItem(v)))
    );
  }

  private mapSelectValueToSelectItem(selectValue: SelectValueDto): SelectItem {
    return { label: selectValue.name, value: selectValue.id };
  }
}
