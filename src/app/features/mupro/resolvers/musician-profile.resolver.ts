import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MusicianProfileDto } from '@arpa/models';
import { MuproService } from '../services/mupro.service';

@Injectable({
  providedIn: 'root',
})
export class MusicianProfileResolver implements Resolve<MusicianProfileDto> {
  constructor(private muproService: MuproService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MusicianProfileDto> {
    const { musicianProfileId } = route.params;
    return this.muproService.getMusicianProfile(musicianProfileId);
  }
}
