import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectValueService } from '@arpa/services';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ProjectTypeResolver {
  constructor(private selectValueService: SelectValueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelectItem[]> {
    return this.selectValueService.getProjectTypes();
  }
}
