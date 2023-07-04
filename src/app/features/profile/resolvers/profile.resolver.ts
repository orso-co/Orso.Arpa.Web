import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '@arpa/services';
import { MyUserProfileDto } from '@arpa/models';

@Injectable()
export class ProfileResolver {
  constructor(private meService: MeService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MyUserProfileDto> {
    return this.meService.getMyProfile();
  }
}
