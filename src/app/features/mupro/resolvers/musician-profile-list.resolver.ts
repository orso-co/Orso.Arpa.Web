import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonsService } from '../services/persons.service';
import { MusicianProfileDto } from '@arpa/models';

@Injectable({
  providedIn: 'root',
})
export class MusicianProfileListResolver implements Resolve<MusicianProfileDto[]> {
  constructor(private personService: PersonsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MusicianProfileDto[]> {
    const { personId } = route.params;
    return this.personService.getMusicianProfilesForPerson(personId);
  }
}
