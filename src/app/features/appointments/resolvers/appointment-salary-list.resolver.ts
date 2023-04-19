import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectValueService } from '@arpa/services';

@Injectable()
export class AppointmentSalaryListResolver implements Resolve<SelectItem[]> {
  constructor(private selectValueService: SelectValueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelectItem[]> {
    const tableName = 'Appointment';
    const propertyName = 'Salary';

    return this.selectValueService.get(tableName, propertyName);
  }
}
