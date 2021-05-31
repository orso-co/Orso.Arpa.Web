import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {SelectValueService} from '../../../core/services/select-value.service';
import {SelectItem} from 'primeng/api';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectGenreResolver implements Resolve<SelectItem[]> {
  constructor(private selectValueService: SelectValueService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelectItem[]> {
    const tableName = 'Project';
    const propertyName = 'Genre';

    if (this.selectValueService.loaded(tableName, propertyName)) {
      return of(this.selectValueService.get(tableName, propertyName));
    }

    return this.selectValueService.load(tableName, propertyName).pipe(map(() => this.selectValueService.get(tableName, propertyName)));
  }
}
