import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@arpa/services';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { NewsModifyBodyDto } from '@arpa/models';
import { NewsCreateDto } from '@arpa/models';
import { NewsDto } from '@arpa/models';

export interface GetAllNewsResponse {
  news: NewsDto[];
  totalRecordsCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService implements Resolve<NewsDto[]> {
  private baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/news';
  }

  load(take: number = 25, skip: number = 0, includeHidden = true): Observable<NewsDto[]> {
    return this.apiService
      .get<NewsDto[]>(`${this.baseUrl}?limit=${take}&offset=${skip}&includeHidden=${includeHidden}`)
      .pipe(shareReplay());
  }
  resolve(route: ActivatedRouteSnapshot): Observable<NewsDto[]> {
    return this.load(25, 0, true);
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
  getAllNews(limit: number, offset: number): Observable<NewsDto[]> {
    return this.apiService.get<NewsDto[]>(`${this.baseUrl}?limit=${limit}&offset=${offset}&includeHidden=false`).pipe(shareReplay());
  }
}
