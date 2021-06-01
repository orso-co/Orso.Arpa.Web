import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IMusicianProfileDto } from '../../../models/appointment';
import { MeService } from '../../../core/services/me.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileMusicianResolver implements Resolve<IMusicianProfileDto | IMusicianProfileDto[]> {
  constructor(private meService: MeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMusicianProfileDto | IMusicianProfileDto[]> {
    const { id } = route.params;
    return this.meService.getProfileMusician(id);
  }
}
