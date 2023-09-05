import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '@arpa/services';
import { MyMusicianProfileDto } from '@arpa/models';

@Injectable({
  providedIn: 'root',
})
export class ProfileMusicianResolver {
  constructor(private meService: MeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MyMusicianProfileDto | MyMusicianProfileDto[]> {
    const { id } = route.params;
    return this.meService.getProfilesMusician(id);
  }
}
