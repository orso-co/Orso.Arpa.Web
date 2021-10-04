import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '../../../shared/services/me.service';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';

@Injectable({
  providedIn: 'root',
})
export class ProfileMusicianResolver implements Resolve<MusicianProfileDto | MusicianProfileDto[]> {
  constructor(private meService: MeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MusicianProfileDto | MusicianProfileDto[]> {
    const { id } = route.params;
    return this.meService.getProfileMusician(id);
  }
}
