import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {IProjectDto} from '../models/appointment';
import {ProjectService} from '../core/services/project.service';

@Injectable({providedIn: 'root'})
export class ProjectListResolver implements Resolve<IProjectDto[]> {
  constructor(private projectService: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProjectDto[]> {
    return this.projectService.load();
  }
}
