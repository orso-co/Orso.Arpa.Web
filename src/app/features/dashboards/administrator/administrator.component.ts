import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { IRoleDto } from 'src/app/models/IRoleDto';
import { Observable } from 'rxjs';
import { ISectionTreeDto } from 'src/app/models/section';
import { IUserDto } from '../../../models/IUserDto';
import { RoleService } from '../../../core/services/role.service';
import { SectionService } from '../../../core/services/section.service';

@Component({
  selector: 'arpa-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent {
  users: IUserDto[] = [];
  usersWithRole: IUserDto[] = [];
  roles$: Observable<IRoleDto[]>;
  sectionTree$: Observable<ISectionTreeDto>;

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

  filterUsersWithoutRole(users: IUserDto[]): IUserDto[] {
    return users.filter((u) => u.roleNames.length === 0) ?? null;
  }

  filterUsersWithRole(users: IUserDto[]): IUserDto[] {
    return users.filter((u) => u.roleNames.length !== 0) ?? null;
  }

  onUserChanged(username: string): void {
    this.users = this.users.filter((u) => u.userName !== username);
  }

}
