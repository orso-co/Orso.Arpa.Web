import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MeService } from '../../../core/services/me.service';
import { IUserProfileDto } from '../../../models/IUserProfileDto';

@Injectable()
export class ProfileResolver implements Resolve<IUserProfileDto> {
  constructor(private meService: MeService) {
  }
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserProfileDto> {
    return this.meService.getMyProfile();
  }
}
