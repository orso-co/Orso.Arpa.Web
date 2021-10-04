import { Injectable } from '@angular/core';
import { PersonDto } from '../../../../@arpa/models/personDto';

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
