import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '../../../shared/services/me.service';
import { MyUserProfileDto } from '../../../../@arpa/models/myUserProfileDto';

@Injectable()
export class ProfileResolver implements Resolve<MyUserProfileDto> {
  constructor(private meService: MeService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MyUserProfileDto> {
    return this.meService.getMyProfile();
  }
}
