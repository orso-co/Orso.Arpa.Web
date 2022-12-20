import { Component, OnInit } from '@angular/core';
import { ProjectDto, UserDto } from '@arpa/models';
import { shareReplay } from 'rxjs/operators';
import { ApiService } from '@arpa/services';

@Component({
  selector: 'arpa-projects-widget',
  templateUrl: './projects-widget.component.html',
  styleUrls: ['./projects-widget.component.scss'],
})
export class ProjectsWidgetComponent implements OnInit {
  allProjects: ProjectDto[] = [];
  user: UserDto;
  private baseUrl = '/api';

  public isStaff(): boolean {
    return this.user.roleNames!.includes('staff');
  }

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.apiService.get<ProjectDto[]>(`${this.baseUrl}/projects`).pipe(shareReplay());
  }


  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }
}
