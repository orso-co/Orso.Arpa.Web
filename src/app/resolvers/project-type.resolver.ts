import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import {SelectValueService} from '../core/services/select-value.service';
import {SelectItem} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeResolver implements Resolve<SelectItem[]> {

  constructor(private selectValueService: SelectValueService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelectItem[]> {
    const tableName = 'Project';
    const propertyName = 'Type';

    if (this.selectValueService.loaded(tableName, propertyName)) {
      return of(this.selectValueService.get(tableName, propertyName));
    }

    return this.selectValueService.load(tableName, propertyName).pipe(map(() => this.selectValueService.get(tableName, propertyName)));
  }
}
