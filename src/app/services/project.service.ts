import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../models/api-url';
import { IProjectDto } from '../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/projects`;
  }

  load(includeCompleted?: boolean): Observable<IProjectDto[]> {
    if (includeCompleted) {
      const params = new HttpParams().set('includeCompleted', includeCompleted.toString());

      return this.http.get<IProjectDto[]>(this.baseUrl, { params }).pipe(shareReplay());
    }

    return this.http.get<IProjectDto[]>(this.baseUrl).pipe(shareReplay());
  }
}
