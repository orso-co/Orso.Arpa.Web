import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonService } from '@arpa/services';
import { PersonDto } from '@arpa/models';

@Injectable({
  providedIn: 'root',
})
export class PersonResolver {
  constructor(private personService: PersonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonDto> {
    const { personId } = route.params;
    return this.personService.getPerson(personId);
  }
}
