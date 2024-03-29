import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '@arpa/services';
import { MusicianProfileDto, MyMusicianProfileDto } from '@arpa/models';
import { MusicianService } from '../services/musician.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilesResolver {
  constructor(private meService: MeService, private musicianService: MusicianService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MyMusicianProfileDto | MyMusicianProfileDto[] | MusicianProfileDto | MusicianProfileDto[]> {
    if (route.url.length > 1 && route.url[0].path === 'me') {
      return this.meService.getProfilesMusician();
    } else {
      const { personId } = route.params;
      return this.musicianService.getProfilesByPerson(personId);
    }
  }
}
