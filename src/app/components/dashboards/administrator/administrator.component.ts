import { SubSink } from 'subsink';
import { IUserDto } from './../../../models/IUserDto';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnDestroy {
  users: IUserDto[] = [];
  private subs = new SubSink();

  constructor(route: ActivatedRoute) {
    this.subs.add(
      route.data.pipe(map((routeData) => routeData.users)).subscribe((users) => (this.users = this.filterUsersWithoutRole(users)))
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  filterUsersWithoutRole(users: IUserDto[]): IUserDto[] {
    return users.filter((u) => u.roleNames.length === 0) ?? null;
  }

  onUserDeleted(username: string): void {
    this.users = this.users.filter((u) => u.userName !== username);
  }
}
