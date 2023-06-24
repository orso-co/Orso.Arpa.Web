import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MusicianProfileAppointmentParticipationDto } from '@arpa/models';
import { MuproService } from '../services/mupro.service';

@Injectable({
  providedIn: 'root',
})
export class MusicianProfileAppointmentListResolver implements Resolve<MusicianProfileAppointmentParticipationDto[]> {
  constructor(private muproService: MuproService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MusicianProfileAppointmentParticipationDto[]> {
    const { musicianProfileId } = route.parent!.params;
    return this.muproService.getAppointmentParticipations(musicianProfileId);
  }
}
