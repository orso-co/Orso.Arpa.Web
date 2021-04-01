import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {SectionService} from '../core/services/section.service';

@Injectable({ providedIn: 'root' })
export class SectionTreeResolver implements Resolve<boolean> {
  constructor(private sectionService: SectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const treeMaxLevel = route.data.treeMaxLevel;

    if (this.sectionService.treeLoaded(treeMaxLevel)) {
      return of(true);
    }

    return this.sectionService.loadTree(treeMaxLevel).pipe(map(() => this.sectionService.treeLoaded(treeMaxLevel)));
  }
}
