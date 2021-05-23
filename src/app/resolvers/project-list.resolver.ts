import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IProjectDto } from "../models/IProjectDto";
import { ProjectService } from '../core/services/project.service';
import {ProjectListComponent} from '../features/projects/project-list/project-list.component';

@Injectable({ providedIn: 'root' })
export class ProjectListResolver implements Resolve<IProjectDto[]> {
  constructor(private projectService: ProjectService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IProjectDto[]> {
    if (route.component === ProjectListComponent) {
      return this.projectService.load(true);
    } else {
      return this.projectService.load();
    }
  }
}
