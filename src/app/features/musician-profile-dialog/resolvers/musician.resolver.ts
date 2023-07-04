import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '@arpa/services';
import { MyMusicianProfileDto, MusicianProfileDto } from '@arpa/models';
import { MusicianService } from '../services/musician.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedProfileResolver {
  constructor(private meService: MeService, private musicianService: MusicianService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MyMusicianProfileDto | MyMusicianProfileDto[] | MusicianProfileDto | MusicianProfileDto[]> {
    const { profileId } = route.params;
    if (route.url.length > 1 && route.url[0].path === 'me') {
      return this.meService.getProfilesMusician(profileId);
    } else {
      return this.musicianService.getProfile(profileId);
    }
  }
}
