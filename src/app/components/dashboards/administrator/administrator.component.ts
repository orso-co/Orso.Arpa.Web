import { IUserDto } from './../../../models/IUserDto';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent {
  users$: Observable<IUserDto[]>;

  constructor(route: ActivatedRoute) {
    this.users$ = route.data.pipe(map(routeData => routeData.users));
  }

  filterUsersWithoutRole(users: IUserDto[] | null): IUserDto[] | null {
    return users?.filter((u) => u.roleNames.length === 0) ?? null;
  }
}
