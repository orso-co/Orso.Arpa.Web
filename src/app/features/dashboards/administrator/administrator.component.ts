import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RoleService } from '../../../core/services/role.service';
import { SectionService } from '../../../core/services/section.service';
import { SectionTreeDto } from '../../../model/sectionTreeDto';
import { UserDto } from '../../../model/userDto';
import { RoleDto } from '../../../model/roleDto';
import { indexOf } from 'lodash-es';

@Component({
  selector: 'arpa-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent {
  users: UserDto[] = [];
  usersWithRole: UserDto[] = [];
  roles$: Observable<RoleDto[]>;
  sectionTree$: Observable<SectionTreeDto>;

  get usersWithoutRoleCount(): number {
    return this.users.length;
  }

  get usersTotalCount(): number {
    return this.users.length + this.usersWithRole.length;
  }


  constructor(
    route: ActivatedRoute,
    private roleService: RoleService,
    sectionService: SectionService,
  ) {
    route.data.pipe(map((routeData) => routeData.users)).subscribe((users) => (this.users = this.filterUsersWithoutRole(users)));
    route.data.pipe(map((routeData) => routeData.users)).subscribe((users) => (this.usersWithRole = this.filterUsersWithRole(users)));

    this.roles$ = this.roleService.roles$;
    this.sectionTree$ = route.data.pipe(map((routeData) => sectionService.getTree(routeData.treeMaxLevel)!));
  }

  filterUsersWithoutRole(users: UserDto[]): UserDto[] {
    return users.filter((u) => u.roleNames && u.roleNames.length === 0) ?? null;
  }

  filterUsersWithRole(users: UserDto[]): UserDto[] {
    return users.filter((u) => u.roleNames && u.roleNames.length !== 0) ?? null;
  }

  onUserChanged(username: any): void {
    this.users = this.users.filter((u) => u.userName !== username);
  }

}
