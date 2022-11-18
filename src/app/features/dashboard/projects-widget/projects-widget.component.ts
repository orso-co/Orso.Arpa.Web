import { Component, OnInit } from '@angular/core';
import { MeService } from '@arpa/services';
import { ProjectDto, MyProjectDto } from '@arpa/models';

@Component({
  selector: 'arpa-projects-widget',
  templateUrl: './projects-widget.component.html',
  styleUrls: ['./projects-widget.component.scss'],
})
export class ProjectsWidgetComponent implements OnInit {
  myProjects: MyProjectDto[] = [];

  constructor(
    private meService: MeService
  ) {}

  ngOnInit(): void {
    this.meService.getMyProjects().subscribe((projects) => (this.myProjects = projects));
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }
}
