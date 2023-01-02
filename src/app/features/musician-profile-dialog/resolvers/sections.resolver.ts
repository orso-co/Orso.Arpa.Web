import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SectionService } from '@arpa/services';
import { SectionDto } from '@arpa/models';

@Injectable({
  providedIn: 'root',
})
export class SectionsResolver implements Resolve<SectionDto[]> {
  isInstrument: boolean
  constructor(private sectionService: SectionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SectionDto[]> {
    return this.sectionService.load();
  }
}
