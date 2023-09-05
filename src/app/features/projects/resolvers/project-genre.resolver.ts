import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SelectValueService } from '@arpa/services';
import { SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectGenreResolver {
  constructor(private selectValueService: SelectValueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelectItem[]> {
    return this.selectValueService.getProjectGenres();
  }
}
