import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectValueService } from '../services/select-value.service';

@Injectable()
export class SelectValueListResolver implements Resolve<boolean> {
  constructor(private selectValueService: SelectValueService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const tableName = route.data.tableName;
    const propertyName = route.data.propertyName;

    if(!tableName || !propertyName) {
      return of(false);
    }

    if (this.selectValueService.loaded(tableName, propertyName)) {
      return of(true);
    }

    return this.selectValueService.load(tableName, propertyName).pipe(map(() => this.selectValueService.loaded(tableName, propertyName)));
  }
}
