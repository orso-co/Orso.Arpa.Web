import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectParticipationDto } from '@arpa/models';
import { MuproService } from '../services/mupro.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectParticipationListResolver {
  constructor(private muproService: MuproService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectParticipationDto[]> {
    const { musicianProfileId } = route.parent!.params;
    return this.muproService.getProjectParticipations(musicianProfileId);
  }
}
