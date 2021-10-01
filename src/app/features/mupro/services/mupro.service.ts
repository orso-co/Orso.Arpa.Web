import { Injectable } from '@angular/core';
import { PersonDto } from '../../../model/personDto';

@Injectable()
export class MuproService {

  constructor() {
  }

  _person: PersonDto;

  get person(): PersonDto {
    return this._person;
  }

  set person(person: PersonDto) {
    this._person = person;
  }
}
