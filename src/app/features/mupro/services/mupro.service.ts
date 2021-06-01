import { Injectable } from '@angular/core';
import { IUserDto } from '../../../models/IUserDto';
import { Observable } from 'rxjs';
import { IPersonDto } from '../../../models/appointment';

@Injectable()
export class MuproService {

  _person: IPersonDto;

  get person(): IPersonDto {
    return this._person;
  }

  set person(person: IPersonDto) {
    this._person = person;
  }

  constructor() {
  }
}
