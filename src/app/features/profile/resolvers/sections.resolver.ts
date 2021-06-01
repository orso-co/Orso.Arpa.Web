import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ISectionDto } from '../../../models/section';
import { SectionService } from '../../../core/services/section.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsResolver implements Resolve<ISectionDto[]> {
  constructor(private sectionService: SectionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISectionDto[]> {
    return this.sectionService.load();
  }
}
