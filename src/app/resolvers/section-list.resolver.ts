import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SectionService } from '../core/services/section.service';

@Injectable()
export class SectionListResolver implements Resolve<boolean> {
  constructor(private sectionService: SectionService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (this.sectionService.sectionsLoaded) {
      return of(true);
    }

    return this.sectionService.load().pipe(map(() => this.sectionService.sectionsLoaded));
  }
}
