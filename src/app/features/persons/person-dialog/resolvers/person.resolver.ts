import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '@arpa/services';
import { PersonService } from '../../services/person.service';
import { PersonDto } from '@arpa/models';

@Injectable({
  providedIn: 'root',
})
export class PersonResolver implements Resolve<PersonDto> {
  constructor(private meService: MeService, private personService: PersonService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonDto> {
    const { personId } = route.params;
    return this.personService.getPerson(personId);
  }
}
