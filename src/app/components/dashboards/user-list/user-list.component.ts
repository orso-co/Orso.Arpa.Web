import { Observable } from 'rxjs';
import { ISetRoleDto } from './../../../models/ISetRoleDto';
import { AuthService } from './../../../services/auth.service';
import { IRoleDto } from './../../../models/IRoleDto';
import { ToastService } from './../../../services/toast.service';
import { SubSink } from 'subsink';
import { UserService } from './../../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { IUserDto } from './../../../models/IUserDto';
import { Component, EventEmitter, Input, Output, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { orderBy } from 'lodash-es';
import { ConfirmationService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'arpa-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnDestroy, OnChanges {
  @Input() users: IUserDto[] | null = [];
  @Input() roles: IRoleDto[] = [];
  @Output() userDeleted = new EventEmitter<string>();
  @Output() rolesSet = new EventEmitter<ISetRoleDto>();
  usersWithoutRole: IUserDto[] | undefined = [];
  selectedUser: IUserDto | null = null;
  selectedRoles: string[] = [];
  maxRoleLevel$: Observable<number>;
  private subs = new SubSink();

  constructor(
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private userService: UserService,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.maxRoleLevel$ = this.authService.getMaxRoleLevelOfCurrentUser();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('users') && this.users) {
      this.usersWithoutRole = orderBy(this.users, (user) => user.createdAt, 'desc');
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getInitials(user: IUserDto): string {
    return `${user.displayName
      .split(' ')
      .map((name) => name[0].toUpperCase())
      .join('')}`;
  }

  onSelected(event: any, panel: any): void {
    this.selectedUser = event.option;
    this.selectedRoles = this.selectedUser!.roleNames;
    panel.toggle(event.originalEvent);
  }

  saveRoles(panel: OverlayPanel): void {
    const dto: ISetRoleDto = { userName: this.selectedUser!.userName, roleNames: this.selectedRoles };
    this.subs.add(
      this.authService.setUserRoles(dto).subscribe(() => {
        this.rolesSet.emit(dto);
        this.selectedUser = null;
        this.selectedRoles = [];
        panel.hide();
        this.toastService.success('userlist.USER_ROLES_SET');
      })
    );
  }

  showDeleteConfirmation(event: Event) {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: this.translateService.instant('userlist.PROCEED'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteSelectedUser();
      },
    });
  }

  hasUserRight(optionLevel: number, maxRoleLevel: number | null): boolean {
    return optionLevel > (maxRoleLevel ?? 0);
  }

  private deleteSelectedUser(): void {
    this.subs.add(
      this.userService.deleteUser(this.selectedUser!.userName).subscribe(() => {
        this.userDeleted.emit(this.selectedUser!.userName);
        this.selectedUser = null;
        this.selectedRoles = [];
        this.toastService.success('userlist.USER_DELETED');
      })
    );
  }
}
