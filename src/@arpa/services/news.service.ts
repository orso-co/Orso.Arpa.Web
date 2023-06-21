import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@arpa/services';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { NewsModifyBodyDto } from '../models/NewsModifyBodyDto';
import { NewsCreateDto } from '../models/NewsCreateDto';
import { NewsDto } from '../models/NewsDto';

@Injectable({
  providedIn: 'root',
})
export class NewsService implements Resolve<NewsDto[]> {
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/news';
  }

  load(): Observable<NewsDto[]> {
    return this.apiService.get<NewsDto[]>(this.baseUrl).pipe(shareReplay());
  }

  resolve(route: ActivatedRouteSnapshot): Observable<NewsDto[]> {
    return this.load();
  }

  create(dto: NewsCreateDto): Observable<NewsDto> {
    return this.apiService.post<NewsDto>(this.baseUrl, dto).pipe(shareReplay());
  }

  update(id: string, dto: NewsModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${id}`, dto).pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }
}
