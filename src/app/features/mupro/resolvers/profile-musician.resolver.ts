import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonsService } from '../services/persons.service';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';

@Injectable({
  providedIn: 'root',
})
export class ProfileMusicianResolver implements Resolve<MusicianProfileDto> {
  constructor(private personService: PersonsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MusicianProfileDto> {
    const { id } = route.params;
    return this.personService.getMusicianProfile(id);
  }
}
