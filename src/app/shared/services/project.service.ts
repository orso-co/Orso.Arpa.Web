import { UrlModifyBodyDto } from './../../../@arpa/models/urlModifyBodyDto';
import { UrlDto } from 'src/@arpa/models/urlDto';
import { UrlCreateBodyDto } from './../../../@arpa/models/urlCreateBodyDto';
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

  public addUrl(projectId: string, data: UrlCreateBodyDto): Observable<any> {
    return this.apiService.post(`${this.baseUrl}/${projectId}/urls`, data).pipe(shareReplay());
  }

  public modifyUrl(id: string, data: UrlModifyBodyDto): Observable<any> {
    return this.apiService.put(`/urls/${id}`, data).pipe(shareReplay());
  }

  public removeUrl(data: UrlDto): Observable<any> {
    return this.apiService.delete(`/urls/${data.id}`);
  }

  public addRoleToUrl(urlId: string, roleId: string): Observable<any> {
    return this.apiService.post(`/urls/${urlId}/roles/${roleId}`, {}).pipe(shareReplay());
  }

  public removeRoleFromUrl(urlId: string, roleId: string): Observable<any> {
    return this.apiService.delete(`/urls/${urlId}/roles/${roleId}`).pipe(shareReplay());
  }
}
