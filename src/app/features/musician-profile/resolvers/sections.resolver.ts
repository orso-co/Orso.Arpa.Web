import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SectionService } from '../../../core/services/section.service';
import { SectionDto } from '../../../model/sectionDto';

@Injectable({
  providedIn: 'root',
})
export class SectionsResolver implements Resolve<SectionDto[]> {
  constructor(private sectionService: SectionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SectionDto[]> {
    return this.sectionService.load();
  }
}
