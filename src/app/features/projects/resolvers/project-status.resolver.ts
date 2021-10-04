import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { SelectValueService } from '../../../shared/services/select-value.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectStateResolver implements Resolve<SelectItem[]> {
  constructor(private selectValueService: SelectValueService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelectItem[]> {
    const tableName = 'Project';
    const propertyName = 'State';

    if (this.selectValueService.loaded(tableName, propertyName)) {
      return of(this.selectValueService.get(tableName, propertyName));
    }

    return this.selectValueService.load(tableName, propertyName).pipe(map(() => this.selectValueService.get(tableName, propertyName)));
  }
}
