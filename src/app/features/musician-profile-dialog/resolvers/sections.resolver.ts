import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SectionService } from '../../../shared/services/section.service';
import { SectionDto } from '../../../../@arpa/models/sectionDto';

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
