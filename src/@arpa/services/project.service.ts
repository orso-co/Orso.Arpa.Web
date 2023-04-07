import {
  SetProjectParticipationBodyDto,
  UrlModifyBodyDto,
  UrlDto,
  UrlCreateBodyDto,
  ProjectDto,
  ProjectParticipationDto,
} from '@arpa/models';
import { first, map, shareReplay } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@arpa/services';
import { Apollo } from 'apollo-angular';
import { cloneDeep } from 'lodash-es';
import { ProjectAppointments } from './project-appointments.graphql';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly baseUrl: string;

  constructor(private apiService: ApiService, private apollo: Apollo) {
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

  public setParticipation(projectId: string, dto: SetProjectParticipationBodyDto): Observable<ProjectParticipationDto> {
    return this.apiService.put<ProjectParticipationDto>(`${this.baseUrl}/${projectId}/participations`, dto).pipe(shareReplay());
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

  public getAppointmentsForProject(projectId: string): Observable<any> {
    return this.apollo.query({ query: ProjectAppointments, variables: { projectId } }).pipe(
      first(),
      map((result: any) => {
        const appointments = result.data.projects.items?.[0]?.projectAppointments;
        return appointments ? cloneDeep(appointments) : [];
      })
    );
  }

  public query(query: { query: any; variables: any }): Observable<any> {
    return this.apollo.query(query).pipe(first(), shareReplay());
  }
}
