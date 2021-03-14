import { ProjectService } from './../services/project.service';
import { IProjectDto } from './../models/appointment';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProjectListResolver implements Resolve<IProjectDto[]> {
  constructor(private projectService: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProjectDto[]> {
    return this.projectService.load();
  }
}
