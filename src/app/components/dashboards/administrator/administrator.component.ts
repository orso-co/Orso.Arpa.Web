import { SectionService } from './../../../services/section.service';
import { RoleService } from './../../../services/role.service';
import { SubSink } from 'subsink';
import { IUserDto } from './../../../models/IUserDto';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { IRoleDto } from 'src/app/models/IRoleDto';
import { Observable } from 'rxjs';
import { ISectionTreeDto } from 'src/app/models/section';

@Component({
  selector: 'arpa-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnDestroy {
  users: IUserDto[] = [];
  usersWithRole: IUserDto[] = [];
  usersWithAdminRole: IUserDto [] = [];
  usersWithStaffRole: IUserDto [] = [];
  usersWithPerformerRole: IUserDto [] = [];
  roles$: Observable<IRoleDto[]>;
  sectionTree$: Observable<ISectionTreeDto>;
  private subs = new SubSink();

  constructor(
    route: ActivatedRoute,
    private roleService: RoleService,
    sectionService: SectionService,
    ) {
    this.subs.add(
      route.data.pipe(map((routeData) => routeData.users)).subscribe((users) => (this.users = this.filterUsersWithoutRole(users))),
      route.data.pipe(map((routeData) => routeData.users)).subscribe((users) => (this.usersWithRole = this.filterUsersWithRole(users))),
      route.data.pipe(map((routeData) => routeData.users)).subscribe((users) => (this.usersWithAdminRole = this.filterUsersWithAdminRole(users))),
      route.data.pipe(map((routeData) => routeData.users)).subscribe((users) => (this.usersWithStaffRole = this.filterUsersWithStaffRole(users))),
      route.data.pipe(map((routeData) => routeData.users)).subscribe((users) => (this.usersWithPerformerRole = this.filterUsersWithPerformerRole(users)))
    );

    //
    this.roles$ = this.roleService.roles$;
    this.sectionTree$ = route.data.pipe(map((routeData) => sectionService.getTree(routeData.treeMaxLevel)!));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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

  filterUsersWithAdminRole(users: IUserDto[]): IUserDto[] {
    return users.filter((u) => u.roleNames.includes ('Admin')) ?? null;
  }
  filterUsersWithStaffRole(users: IUserDto[]): IUserDto[] {
    return users.filter((u) => u.roleNames.includes ('Staff')) ?? null;
  }
  filterUsersWithPerformerRole(users: IUserDto[]): IUserDto[] {
    return users.filter((u) => u.roleNames.includes ('Performer')) ?? null;
  }

}
