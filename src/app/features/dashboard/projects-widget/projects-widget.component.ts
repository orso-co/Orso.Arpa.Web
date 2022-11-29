import { Component, OnInit } from '@angular/core';
import { ProjectDto } from '@arpa/models';
import { shareReplay } from 'rxjs/operators';
import { ApiService, AuthService } from '@arpa/services';

@Component({
  selector: 'arpa-projects-widget',
  templateUrl: './projects-widget.component.html',
  styleUrls: ['./projects-widget.component.scss'],
})
export class ProjectsWidgetComponent implements OnInit {
  allProjects: ProjectDto[] = [];
  private baseUrl = '/api';

  constructor(
    private apiService: ApiService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.apiService.get<ProjectDto[]>(`${this.baseUrl}/projects`).pipe(shareReplay());
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }
}
