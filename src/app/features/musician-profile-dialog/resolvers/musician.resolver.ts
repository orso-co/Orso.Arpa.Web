import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '@arpa/services';
import { MusicianProfileDto } from '@arpa/models';
import { MusicianService } from '../services/musician.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedProfileResolver implements Resolve<MusicianProfileDto | MusicianProfileDto[]> {
  constructor(private meService: MeService, private musicianService: MusicianService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MusicianProfileDto | MusicianProfileDto[]> {
    const { profileId } = route.params;
    if (route.url.length > 1 && route.url[0].path === 'me') {
      return this.meService.getProfilesMusician(profileId);
    } else {
      return this.musicianService.getProfile(profileId);
    }
  }
}
