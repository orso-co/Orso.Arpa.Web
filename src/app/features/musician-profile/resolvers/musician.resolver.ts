import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '../../../shared/services/me.service';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { MusicianService } from '../services/musician.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<MusicianProfileDto | MusicianProfileDto[]> {
  constructor(private meService: MeService, private musicianService: MusicianService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MusicianProfileDto | MusicianProfileDto[]> {
    const { id } = route.params;
    if (route.url.length > 1 && route.url[0].path === 'me') {
      return this.meService.getProfileMusician(id);
    } else {
      return this.musicianService.getProfile(id);
    }
  }
}
