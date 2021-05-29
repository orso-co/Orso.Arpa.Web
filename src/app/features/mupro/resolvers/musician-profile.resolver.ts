import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PersonsService } from '../services/persons.service';
import { IMusicianProfileDto } from '../../../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class MusicianProfileResolver implements Resolve<IMusicianProfileDto> {
  constructor(private personService: PersonsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMusicianProfileDto> {
    const { id } = route.params;
    return this.personService.getMusicianProfile(id);
  }
}
