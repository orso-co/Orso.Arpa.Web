import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../../../shared/services/project.service';
import { ProjectListComponent } from '../../projects/project-list/project-list.component';
import { ProjectDto } from '../../../../@arpa/models/projectDto';

@Injectable({ providedIn: 'root' })
export class ProjectListResolver implements Resolve<ProjectDto[]> {
  constructor(private projectService: ProjectService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ProjectDto[]> {
    if (route.component === ProjectListComponent) {
      return this.projectService.load(true);
    } else {
      return this.projectService.load();
    }
  }
}