import { shareReplay } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../@arpa/services/api.service';
import { ProjectDto } from '../../../@arpa/models/projectDto';
import { ProjectParticipationDto } from '../../../@arpa/models/projectParticipationDto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/projects';
  }

  public load(includeCompleted?: boolean): Observable<ProjectDto[]> {
    if (includeCompleted) {
      const params = new HttpParams().set('includeCompleted', includeCompleted.toString());

      return this.apiService.get<ProjectDto[]>(this.baseUrl, params).pipe(shareReplay());
    }

    return this.apiService.get<ProjectDto[]>(this.baseUrl).pipe(shareReplay());
  }

  public create(project: ProjectDto): Observable<ProjectDto> {
    return this.apiService.post<ProjectDto>(this.baseUrl, project);
  }

  public update(project: ProjectDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${project.id}`, project).pipe(shareReplay());
  }

  public getParticipations(id: string): Observable<ProjectParticipationDto[]> {
    return this.apiService.get<ProjectParticipationDto[]>(`${this.baseUrl}/${id}/participations`).pipe(shareReplay());
  }
}
