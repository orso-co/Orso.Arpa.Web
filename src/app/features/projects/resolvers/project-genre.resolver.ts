import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SelectValueService } from '@arpa/services';
import { SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectGenreResolver implements Resolve<SelectItem[]> {
  constructor(private selectValueService: SelectValueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelectItem[]> {
    const tableName = 'Project';
    const propertyName = 'Genre';

    return this.selectValueService.get(tableName, propertyName);
  }
}
