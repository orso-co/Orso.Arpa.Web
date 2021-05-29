import { shareReplay } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IProjectDto } from '../../models/IProjectDto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/projects';
  }

  public load(includeCompleted?: boolean): Observable<IProjectDto[]> {
    if (includeCompleted) {
      const params = new HttpParams().set('includeCompleted', includeCompleted.toString());

      return this.apiService.get<IProjectDto[]>(this.baseUrl, params).pipe(shareReplay());
    }

    return this.apiService.get<IProjectDto[]>(this.baseUrl).pipe(shareReplay());
  }

  public create(project: IProjectDto): Observable<IProjectDto> {
    return this.apiService.post<IProjectDto>(this.baseUrl, project);
  }

  public update(project: IProjectDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${project.id}`, project).pipe(shareReplay());
  }
}
