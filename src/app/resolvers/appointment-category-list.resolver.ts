import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {SelectValueService} from '../core/services/select-value.service';

@Injectable()
export class AppointmentCategoryListResolver implements Resolve<SelectItem[]> {
  constructor(private selectValueService: SelectValueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelectItem[]> {
    const tableName = 'Appointment';
    const propertyName = 'Category';

    if (this.selectValueService.loaded(tableName, propertyName)) {
      return of(this.selectValueService.get(tableName, propertyName));
    }

    return this.selectValueService.load(tableName, propertyName).pipe(map(() => this.selectValueService.get(tableName, propertyName)));
  }
}
